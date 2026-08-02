package com.cdac.weddingplanner.client.dto;

import java.util.List;

public class PackageResponse {

    private Long id;
    private Long plannerId;
    private String plannerName;
    private String title;
    private String price;
    private String category;
    private String tag;
    private String capacity;
    private String imageUrl;
    private String description;
    private List<String> features;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlannerId() {
        return plannerId;
    }

    public void setPlannerId(Long plannerId) {
        this.plannerId = plannerId;
    }

    public String getPlannerName() {
        return plannerName;
    }

    public void setPlannerName(String plannerName) {
        this.plannerName = plannerName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }
}
