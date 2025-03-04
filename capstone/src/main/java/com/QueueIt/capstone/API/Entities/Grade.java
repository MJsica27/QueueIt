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
    @ManyToOne
    @JoinColumn(name = "criterion_id")
    private Criterion criterion;
    private String studentName;
    private float mark;

    public Grade() {
    }

    public Grade(Meeting meeting, Criterion criterion, String studentName, float mark) {
        this.meeting = meeting;
        this.criterion = criterion;
        this.studentName = studentName;
        this.mark = mark;
    }

    public Long getGradeID() {
        return gradeID;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public Criterion getCriterion() {
        return criterion;
    }

    public String getStudentName() {
        return studentName;
    }

    public float getMark() {
        return mark;
    }

    public void setMark(float mark) {
        this.mark = mark;
    }
}
