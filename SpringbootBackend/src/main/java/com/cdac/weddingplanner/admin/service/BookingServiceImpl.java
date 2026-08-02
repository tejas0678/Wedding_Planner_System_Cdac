package com.cdac.weddingplanner.admin.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.custom_exception.ApiException;
import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.BookingDTO;
import com.cdac.weddingplanner.admin.dto.BookingRequestDTO;
import com.cdac.weddingplanner.admin.entities.Booking;
import com.cdac.weddingplanner.admin.entities.BookingStatus;
import com.cdac.weddingplanner.admin.entities.Client;
import com.cdac.weddingplanner.admin.entities.Planner;
import com.cdac.weddingplanner.admin.repository.BookingRepository;
import com.cdac.weddingplanner.admin.repository.ClientRepository;
import com.cdac.weddingplanner.admin.repository.PaymentRepository;
import com.cdac.weddingplanner.admin.repository.PlannerRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ClientRepository clientRepository;
    private final PlannerRepository plannerRepository;
    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<BookingDTO> getAllBookings(Pageable pageable) {

        Page<Booking> bookings = bookingRepository.findAll(pageable);

        return bookings.map(booking ->
                modelMapper.map(booking, BookingDTO.class));
    }

    @Override
    public BookingDTO getBookingById(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid booking id : " + id));

        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    @Transactional
    public ApiResponse updateBooking(Long id, BookingRequestDTO dto) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid booking id : " + id));

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid client id : " + dto.getClientId()));

        Planner planner = plannerRepository.findById(dto.getPlannerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid planner id : " + dto.getPlannerId()));

        modelMapper.map(dto, booking);

        booking.setClient(client);
        booking.setPlanner(planner);

        bookingRepository.save(booking);

        return new ApiResponse(
                "Success",
                "Booking updated successfully");
    }

    @Override
    @Transactional
    public ApiResponse updateBookingStatus(Long id, String status) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid booking id : " + id));

        BookingStatus newStatus;

        try {
            newStatus = BookingStatus.valueOf(status.toUpperCase());

        } catch (IllegalArgumentException e) {
            throw new ApiException(
                    "Invalid status : " + status);
        }

        booking.setStatus(newStatus);

        return new ApiResponse(
                "Success",
                "Booking status updated successfully");
    }

    @Override
    @Transactional
    public ApiResponse deleteBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid booking id : " + id));

        // Check whether payment exists for this booking
        if (paymentRepository.existsByBookingId(id)) {

            throw new ApiException(
                    "Cannot delete booking because payment exists for this booking");
        }

        bookingRepository.delete(booking);

        return new ApiResponse(
                "Success",
                "Booking deleted successfully");
    }
}