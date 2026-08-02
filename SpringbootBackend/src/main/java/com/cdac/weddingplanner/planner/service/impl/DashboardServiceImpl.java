package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.response.DashboardStatsResponse;
import com.weddingplanner.plannerservice.entity.Booking;
import com.weddingplanner.plannerservice.entity.Review;
import com.weddingplanner.plannerservice.enums.BookingStatus;
import com.weddingplanner.plannerservice.repository.BookingRepository;
import com.weddingplanner.plannerservice.repository.PackageOfferingRepository;
import com.weddingplanner.plannerservice.repository.PortfolioItemRepository;
import com.weddingplanner.plannerservice.repository.ReviewRepository;
import com.weddingplanner.plannerservice.repository.ServiceOfferingRepository;
import com.weddingplanner.plannerservice.service.DashboardService;
import com.weddingplanner.plannerservice.util.InrFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;
    private final PortfolioItemRepository portfolioItemRepository;
    private final PackageOfferingRepository packageOfferingRepository;

    @Override
    public DashboardStatsResponse getStats(Long plannerId) {
        List<Booking> bookings = bookingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId);

        long pending = count(bookings, BookingStatus.PENDING);
        long accepted = count(bookings, BookingStatus.ACCEPTED);
        long confirmed = count(bookings, BookingStatus.CONFIRMED);
        long completed = count(bookings, BookingStatus.COMPLETED);
        long rejected = count(bookings, BookingStatus.REJECTED);

        BigDecimal totalRevenue = bookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED || b.getStatus() == BookingStatus.CONFIRMED)
                .map(Booking::getAmount)
                .filter(a -> a != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Review> reviews = reviewRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId);
        double avgRating = reviews.isEmpty() ? 0.0 : reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        return DashboardStatsResponse.builder()
                .totalBookings(bookings.size())
                .pendingBookings(pending)
                .acceptedBookings(accepted)
                .confirmedBookings(confirmed)
                .completedBookings(completed)
                .rejectedBookings(rejected)
                .totalRevenue(InrFormatter.format(totalRevenue))
                .averageRating(Math.round(avgRating * 10.0) / 10.0)
                .totalReviews(reviews.size())
                .totalServices(serviceOfferingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).size())
                .totalPortfolioItems(portfolioItemRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).size())
                .totalPackages(packageOfferingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).size())
                .build();
    }

    private long count(List<Booking> bookings, BookingStatus status) {
        return bookings.stream().filter(b -> b.getStatus() == status).count();
    }
}
