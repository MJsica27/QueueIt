package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Attendance {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long attendanceID;
    private Long studentID;
    @ManyToOne
    @JoinColumn(name = "meetingID")
    private Meeting meeting;
    private Date attendanceDate;
    private String attendanceNote;
}
