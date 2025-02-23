package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class QueueingEntry {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long queueingEntryID;
    private Long teamID;
    private String teamName;
    private String classReference;
    @ManyToOne
    @JoinColumn(name = "queueingManager_id")
    @JsonBackReference
    private QueueingManager queueingManager;
    private LocalDateTime dateTimeQueued = LocalDateTime.now();
    private Boolean isOnHold = Boolean.FALSE;
    @OneToMany(mappedBy = "queueingEntry", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Attendance> attendanceList;

    public QueueingEntry() {
    }

    public QueueingEntry(Long teamID, String teamName, String classReference, QueueingManager queueingManager, List<Attendance> attendanceList) {
        this.teamID = teamID;
        this.teamName = teamName;
        this.classReference = classReference;
        this.queueingManager = queueingManager;
        this.attendanceList = attendanceList;
    }

    public void setOnHold(Boolean onHold) {
        isOnHold = onHold;
    }

    public Long getQueueingEntryID() {
        return queueingEntryID;
    }

    public QueueingManager getQueueingManager() {
        return queueingManager;
    }

    public LocalDateTime getDateTimeQueued() {
        return dateTimeQueued;
    }

    public Boolean getOnHold() {
        return isOnHold;
    }

    public Long getTeamID() {
        return teamID;
    }

    public List<Attendance> getAttendanceList() {
        return attendanceList;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getClassReference() {
        return classReference;
    }
}
