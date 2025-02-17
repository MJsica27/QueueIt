package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class QueueingEntry {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long queueingEntryID;
    @OneToOne
    @JoinColumn(name = "team_id")
    @JsonManagedReference
    private Team team;
    @ManyToOne
    @JoinColumn(name = "queueingManager_id")
    @JsonBackReference
    private QueueingManager queueingManager;
    private LocalDateTime dateTimeQueued = LocalDateTime.now();
    private Boolean isOnHold = Boolean.FALSE;

    public QueueingEntry() {
    }

    public QueueingEntry(Team team, QueueingManager queueingManager) {
        this.team = team;
        this.queueingManager = queueingManager;
    }

    public void setOnHold(Boolean onHold) {
        isOnHold = onHold;
    }

    public Long getQueueingEntryID() {
        return queueingEntryID;
    }

    public Team getTeam() {
        return team;
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
}
