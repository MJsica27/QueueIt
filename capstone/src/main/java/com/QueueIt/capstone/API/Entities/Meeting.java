package com.QueueIt.capstone.API.Entities;

import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingID;
    private LocalDateTime start = LocalDateTime.now();
    private LocalDateTime end;
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<Grade> grades;
    private MeetingStatus meetingStatus;
    @OneToOne
    @JoinColumn(name = "queueingEntry_id")
    @JsonManagedReference("entry-meeting")
    private QueueingEntry queueingEntry;
    @OneToOne(mappedBy = "meeting", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JsonBackReference
    private QueueingManager queueingManager;

    public Meeting() {
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public void setMeetingID(Long meetingID) {
        this.meetingID = meetingID;
    }

    public Meeting(MeetingStatus meetingStatus, QueueingEntry queueingEntry, QueueingManager queueingManager) {
        this.meetingStatus = meetingStatus;
        this.queueingEntry = queueingEntry;
        this.queueingManager = queueingManager;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public MeetingStatus getMeetingStatus() {
        return meetingStatus;
    }

    public QueueingEntry getQueueingEntry() {
        return queueingEntry;
    }

    public QueueingManager getQueueingManager() {
        return queueingManager;
    }
}
