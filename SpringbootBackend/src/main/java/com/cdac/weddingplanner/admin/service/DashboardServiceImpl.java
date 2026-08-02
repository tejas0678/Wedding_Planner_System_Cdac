package com.cdac.weddingplanner.admin.service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.dto.DashboardDTO;
import com.cdac.weddingplanner.admin.dto.RecentActivityDTO;
import com.cdac.weddingplanner.admin.dto.TopPlannerDTO;
import com.cdac.weddingplanner.admin.entities.ApprovalStatus;
import com.cdac.weddingplanner.admin.entities.BookingStatus;

import com.cdac.weddingplanner.admin.repository.BookingRepository;
import com.cdac.weddingplanner.admin.repository.ClientRepository;
import com.cdac.weddingplanner.admin.repository.PlannerRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ClientRepository clientRepository;
    private final PlannerRepository plannerRepository;
    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;

    // Convert amount into Indian currency format
    private String formatIndianCurrency(BigDecimal amount) {

        if (amount == null) {
            return "₹0";
        }

        DecimalFormat format = new DecimalFormat("##,##,##0");

        return "₹" + format.format(amount);
    }

    @Override
    public DashboardDTO getDashboard() {

        DashboardDTO dashboard = new DashboardDTO();

        // Dashboard statistics
        dashboard.setTotalClients(clientRepository.count());

        dashboard.setTotalPlanners(plannerRepository.count());

        dashboard.setTotalWeddings(
                bookingRepository.countByStatus(BookingStatus.COMPLETED)
        );

        dashboard.setPendingBookings(
                bookingRepository.countByStatus(BookingStatus.PENDING)
        );

        dashboard.setPendingApprovals(
                plannerRepository.countByApprovalStatus(ApprovalStatus.PENDING)
        );

        // Recent bookings
        List<RecentActivityDTO> recentActivities =
                bookingRepository.findTop5ByOrderByCreatedOnDesc()
                        .stream()
                        .map(booking -> {

                            RecentActivityDTO dto =
                                    modelMapper.map(booking, RecentActivityDTO.class);

                            dto.setClientName(
                                    booking.getClient().getFullName()
                            );

                            dto.setPlannerName(
                                    booking.getPlanner().getBusinessName()
                            );

                            dto.setAmount(
                                    formatIndianCurrency(booking.getAmount())
                            );

                            return dto;
                        })
                        .toList();

        dashboard.setRecentActivities(recentActivities);

        // Top planners
        List<TopPlannerDTO> topPlanners =
                plannerRepository.findTop5ByOrderByRatingDesc()
                        .stream()
                        .map(planner -> {

                            TopPlannerDTO dto =
                                    modelMapper.map(planner, TopPlannerDTO.class);

                            BigDecimal earnings =
                                    bookingRepository.sumAmountByPlannerId(
                                            planner.getId()
                                    );

                            dto.setEarnings(
                                    formatIndianCurrency(earnings)
                            );

                            return dto;
                        })
                        .toList();

        dashboard.setTopPlanners(topPlanners);

        return dashboard;
    }
}