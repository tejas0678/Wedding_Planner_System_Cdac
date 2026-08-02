package com.cdac.weddingplanner.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BookingResponse {

    private Long id;
    private String bookingNumber;
    private String clientName;
    private String clientEmail;

    private String planner;
    private String plannerName;
    private String plannerPhone;
    private String plannerAvatar;

    @JsonProperty("package")
    private String pkg;
    private String packageName;

    private String venue;
    private String location;
    private String weddingDate;
    private String guestCount;
    private Long countdownDays;
    private String amount;
    private String status;
    private String paymentStatus;
    private String stageText;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getPlanner() {
        return planner;
    }

    public void setPlanner(String planner) {
        this.planner = planner;
    }

    public String getPlannerName() {
        return plannerName;
    }

    public void setPlannerName(String plannerName) {
        this.plannerName = plannerName;
    }

    public String getPlannerPhone() {
        return plannerPhone;
    }

    public void setPlannerPhone(String plannerPhone) {
        this.plannerPhone = plannerPhone;
    }

    public String getPlannerAvatar() {
        return plannerAvatar;
    }

    public void setPlannerAvatar(String plannerAvatar) {
        this.plannerAvatar = plannerAvatar;
    }

    public String getPkg() {
        return pkg;
    }

    public void setPkg(String pkg) {
        this.pkg = pkg;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWeddingDate() {
        return weddingDate;
    }

    public void setWeddingDate(String weddingDate) {
        this.weddingDate = weddingDate;
    }

    public String getGuestCount() {
        return guestCount;
    }

    public void setGuestCount(String guestCount) {
        this.guestCount = guestCount;
    }

    public Long getCountdownDays() {
        return countdownDays;
    }

    public void setCountdownDays(Long countdownDays) {
        this.countdownDays = countdownDays;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getStageText() {
        return stageText;
    }

    public void setStageText(String stageText) {
        this.stageText = stageText;
    }
}
