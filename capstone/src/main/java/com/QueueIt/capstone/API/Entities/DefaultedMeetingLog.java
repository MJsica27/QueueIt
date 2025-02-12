package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class DefaultedMeetingLog {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long logID;
    @OneToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
    private Time logTime;
    private String logNote;
}
