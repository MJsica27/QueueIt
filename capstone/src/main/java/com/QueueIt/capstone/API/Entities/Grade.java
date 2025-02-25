package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Grade {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long gradeID;
    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
    @OneToOne
    @JoinColumn(name = "criterion_id")
    private Criterion criterion;
    private float mark;

}
