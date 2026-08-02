
package com.cdac.weddingplanner.admin.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "feedbacks")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = { "client", "planner" }, callSuper = true)
public class Feedback extends BaseClass {

    // Feedback *------>1 Client (uni-directional)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    // Feedback *------>1 Planner (uni-directional)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planner_id", nullable = false)
    private Planner planner;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "comment", length = 1000)
    private String comment;

    @Column(name = "feedback_date")
    private LocalDate feedbackDate = LocalDate.now();
}

