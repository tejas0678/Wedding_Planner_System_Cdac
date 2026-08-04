package com.cdac.weddingplanner.payment.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.NotificationService;
import com.cdac.weddingplanner.payment.dto.*;
import com.cdac.weddingplanner.payment.entity.Payment;
import com.cdac.weddingplanner.payment.exception.PaymentConflictException;
import com.cdac.weddingplanner.payment.exception.PaymentNotFoundException;
import com.cdac.weddingplanner.payment.exception.PaymentValidationException;
import com.cdac.weddingplanner.payment.exception.RazorpayGatewayException;
import com.cdac.weddingplanner.payment.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements com.cdac.weddingplanner.payment.service.PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    @Override
    @Transactional
    public CreateOrderResponseDTO createOrder(CreateOrderRequestDTO request) {
        User client = getAuthenticatedUser();

        if (request.getBookingId() == null) {
            throw new PaymentValidationException("bookingId is required");
        }
        if (request.getAmount() == null || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new PaymentValidationException("Amount must be greater than zero");
        }

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new PaymentNotFoundException("Booking not found: " + request.getBookingId()));

        if (booking.getUser() == null || !booking.getUser().getId().equals(client.getId())) {
            throw new PaymentValidationException("You do not have access to this booking");
        }
        if (booking.getStatus() != Booking.BookingStatus.CONFIRMED) {
            throw new PaymentConflictException("Only confirmed bookings can be paid. Wait for the planner to confirm this booking.");
        }
        if (booking.getPaymentStatus() == Booking.PaymentStatus.PAID) {
            throw new PaymentConflictException("This booking has already been paid for.");
        }
        if (paymentRepository.existsByBookingIdAndStatus(booking.getId(), Payment.PaymentStatus.PAID)) {
            throw new PaymentConflictException("A successful payment already exists for this booking.");
        }

        String currency = (request.getCurrency() != null && !request.getCurrency().isBlank()) ? request.getCurrency() : "INR";
        long amountInPaise = request.getAmount()
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .longValueExact();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "booking_" + booking.getId() + "_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order;
        try {
            order = razorpayClient.orders.create(orderRequest);
        } catch (RazorpayException e) {
            log.error("Razorpay order creation failed for booking {}", booking.getId(), e);
            throw new RazorpayGatewayException("Razorpay was unable to create the payment order", e);
        }

        String orderId = order.get("id");

        Payment payment = Payment.builder()
                .bookingId(booking.getId())
                .clientId(client.getId())
                .plannerId(booking.getPlannerId())
                .razorpayOrderId(orderId)
                .amount(request.getAmount())
                .currency(currency)
                .status(Payment.PaymentStatus.PENDING)
                .build();
        paymentRepository.save(payment);

        log.info("Created Razorpay order {} for booking {} (client {}), amount {} {}",
                orderId, booking.getId(), client.getId(), request.getAmount(), currency);

        return CreateOrderResponseDTO.builder()
                .orderId(orderId)
                .amount(request.getAmount())
                .currency(currency)
                .key(keyId)
                .build();
    }

    @Override
    @Transactional
    public VerifyPaymentResponseDTO verifyPayment(VerifyPaymentRequestDTO request) {
        User client = getAuthenticatedUser();

        if (isBlank(request.getRazorpayOrderId()) || isBlank(request.getRazorpayPaymentId()) || isBlank(request.getRazorpaySignature())) {
            throw new PaymentValidationException("razorpayOrderId, razorpayPaymentId and razorpaySignature are all required");
        }

        Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new PaymentNotFoundException("No matching payment order found: " + request.getRazorpayOrderId()));

        if (!payment.getClientId().equals(client.getId())) {
            throw new PaymentValidationException("You do not have access to this payment");
        }
        if (request.getBookingId() != null && !payment.getBookingId().equals(request.getBookingId())) {
            throw new PaymentValidationException("bookingId does not match the payment order");
        }
        if (payment.getStatus() == Payment.PaymentStatus.PAID) {
            throw new PaymentConflictException("This payment has already been verified.");
        }

        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());

        boolean valid;
        try {
            valid = Utils.verifyPaymentSignature(attributes, keySecret);
        } catch (RazorpayException e) {
            log.warn("Signature verification threw for booking {}, order {}: {}",
                    payment.getBookingId(), request.getRazorpayOrderId(), e.getMessage());
            valid = false;
        }

        if (!valid) {
            payment.setStatus(Payment.PaymentStatus.FAILED);
            paymentRepository.save(payment);
            log.warn("Signature verification failed for booking {}, order {}", payment.getBookingId(), request.getRazorpayOrderId());
            return VerifyPaymentResponseDTO.builder()
                    .success(false)
                    .message("Payment signature verification failed")
                    .build();
        }

        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setPaymentMethod(fetchPaymentMethod(request.getRazorpayPaymentId()));
        payment.setStatus(Payment.PaymentStatus.PAID);
        payment.setTransactionDate(LocalDateTime.now());
        paymentRepository.save(payment);

        Booking booking = bookingRepository.findById(payment.getBookingId())
                .orElseThrow(() -> new PaymentNotFoundException("Booking not found: " + payment.getBookingId()));
        BigDecimal previouslyPaid = booking.getPaidAmount() != null ? booking.getPaidAmount() : BigDecimal.ZERO;
        booking.setPaidAmount(previouslyPaid.add(payment.getAmount()));
        booking.setPaymentStatus(Booking.PaymentStatus.PAID);
        bookingRepository.save(booking);

        log.info("Verified payment {} for booking {}, order {}, amount {}",
                request.getRazorpayPaymentId(), booking.getId(), request.getRazorpayOrderId(), payment.getAmount());

        sendPaymentNotifications(booking, payment);

        return VerifyPaymentResponseDTO.builder()
                .success(true)
                .message("Payment verified successfully")
                .paymentId(payment.getId())
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .amount(payment.getAmount())
                .transactionDate(payment.getTransactionDate())
                .build();
    }

    @Override
    public List<PaymentHistoryDTO> getClientPayments() {
        User client = getAuthenticatedUser();
        return paymentRepository.findByClientIdOrderByCreatedAtDesc(client.getId()).stream()
                .map(this::toHistoryDto)
                .toList();
    }

    @Override
    public List<PaymentHistoryDTO> getPlannerPayments() {
        User planner = getAuthenticatedUser();
        return paymentRepository.findByPlannerIdOrderByCreatedAtDesc(planner.getId()).stream()
                .map(this::toHistoryDto)
                .toList();
    }

    @Override
    public List<AdminPaymentDTO> getAdminPayments(String status) {
        List<Payment> payments = paymentRepository.findAllByOrderByCreatedAtDesc();
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("All")) {
            payments = payments.stream()
                    .filter(p -> displayStatus(p.getStatus()).equalsIgnoreCase(status))
                    .toList();
        }
        return payments.stream().map(this::toAdminDto).toList();
    }

    @Override
    public AdminPaymentDTO getAdminPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found: " + id));
        return toAdminDto(payment);
    }

    @Override
    public PaymentSummaryDTO getAdminPaymentsSummary() {
        List<Payment> all = paymentRepository.findAll();
        LocalDate today = LocalDate.now();

        BigDecimal totalRevenue = sumByStatus(all, Payment.PaymentStatus.PAID);
        BigDecimal todayRevenue = all.stream()
                .filter(p -> p.getStatus() == Payment.PaymentStatus.PAID
                        && p.getTransactionDate() != null
                        && p.getTransactionDate().toLocalDate().isEqual(today))
                .map(Payment::getAmount).filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal monthlyRevenue = all.stream()
                .filter(p -> p.getStatus() == Payment.PaymentStatus.PAID
                        && p.getTransactionDate() != null
                        && p.getTransactionDate().getMonth() == today.getMonth()
                        && p.getTransactionDate().getYear() == today.getYear())
                .map(Payment::getAmount).filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal pendingAmount = sumByStatus(all, Payment.PaymentStatus.PENDING);
        BigDecimal failedAmount = sumByStatus(all, Payment.PaymentStatus.FAILED);

        long pendingCount = all.stream().filter(p -> p.getStatus() == Payment.PaymentStatus.PENDING).count();
        long failedCount = all.stream().filter(p -> p.getStatus() == Payment.PaymentStatus.FAILED).count();

        return PaymentSummaryDTO.builder()
                .totalRevenue(totalRevenue)
                .todayRevenue(todayRevenue)
                .monthlyRevenue(monthlyRevenue)
                .pendingAmount(pendingAmount)
                .failedAmount(failedAmount)
                .totalPayments(all.size())
                .pendingCount(pendingCount)
                .failedCount(failedCount)
                .build();
    }

    private void sendPaymentNotifications(Booking booking, Payment payment) {
        String amountStr = "₹" + String.format("%,.2f", payment.getAmount());

        if (booking.getUser() != null) {
            notificationService.createNotification(
                    booking.getUser().getId(), Role.USER,
                    "Payment Successful",
                    "Your payment of " + amountStr + " has been completed successfully.",
                    NotificationType.SUCCESS, "BOOKING", booking.getId()
            );
        }

        if (booking.getPlannerId() != null) {
            notificationService.createNotification(
                    booking.getPlannerId(), Role.PLANNER,
                    "Payment Received",
                    "You have received a payment of " + amountStr + " for Booking #" + booking.getId() + ".",
                    NotificationType.SUCCESS, "BOOKING", booking.getId()
            );
        }

        userRepository.findByRoleAndEnabledTrue(Role.ADMIN).forEach(admin ->
                notificationService.createNotification(
                        admin.getId(), Role.ADMIN,
                        "New Payment Received",
                        "A new payment of " + amountStr + " has been received.",
                        NotificationType.INFO, "BOOKING", booking.getId()
                )
        );
    }

    private String fetchPaymentMethod(String razorpayPaymentId) {
        try {
            com.razorpay.Payment rpPayment = razorpayClient.payments.fetch(razorpayPaymentId);
            Object method = rpPayment.get("method");
            return method != null ? method.toString() : "razorpay";
        } catch (Exception e) {
            log.warn("Could not fetch payment method for {}: {}", razorpayPaymentId, e.getMessage());
            return "razorpay";
        }
    }

    private PaymentHistoryDTO toHistoryDto(Payment payment) {
        Booking booking = bookingRepository.findById(payment.getBookingId()).orElse(null);
        return PaymentHistoryDTO.builder()
                .paymentId(payment.getId())
                .bookingId(payment.getBookingId())
                .bookingNumber(booking != null ? booking.getBookingNumber() : null)
                .clientName(booking != null && booking.getUser() != null ? booking.getUser().getFullName() : null)
                .plannerName(booking != null ? booking.getPlannerName() : null)
                .packageName(booking != null ? booking.getPackageName() : null)
                .eventDate(booking != null ? booking.getEventDate() : null)
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .paymentMethod(payment.getPaymentMethod())
                .status(displayStatus(payment.getStatus()))
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .transactionDate(payment.getTransactionDate())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    private AdminPaymentDTO toAdminDto(Payment payment) {
        Booking booking = bookingRepository.findById(payment.getBookingId()).orElse(null);
        LocalDateTime dateSource = payment.getTransactionDate() != null ? payment.getTransactionDate() : payment.getCreatedAt();
        String dateStr = dateSource != null ? dateSource.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : "";

        return AdminPaymentDTO.builder()
                .id(payment.getId())
                .paymentNumber("PAY-" + String.format("%05d", payment.getId()))
                .bookingNumber(booking != null ? booking.getBookingNumber() : ("BOOKING-" + payment.getBookingId()))
                .clientName(booking != null && booking.getUser() != null ? booking.getUser().getFullName() : "Client")
                .plannerName(booking != null ? booking.getPlannerName() : "Planner")
                .packageName(booking != null ? booking.getPackageName() : null)
                .amount(payment.getAmount())
                .gateway("Razorpay")
                .status(displayStatus(payment.getStatus()))
                .paymentDate(dateStr)
                .type("Booking Payment")
                .transactionId(payment.getRazorpayPaymentId() != null ? payment.getRazorpayPaymentId() : "N/A")
                .build();
    }

    private String displayStatus(Payment.PaymentStatus status) {
        return switch (status) {
            case PAID -> "Paid";
            case FAILED -> "Failed";
            case PENDING -> "Pending";
        };
    }

    private BigDecimal sumByStatus(List<Payment> payments, Payment.PaymentStatus status) {
        return payments.stream()
                .filter(p -> p.getStatus() == status)
                .map(Payment::getAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            throw new PaymentValidationException("Authentication required");
        }
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new PaymentValidationException("User not found"));
    }
}
