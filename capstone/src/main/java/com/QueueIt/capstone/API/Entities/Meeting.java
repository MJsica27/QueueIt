package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Meeting {

    @Id
    @GeneratedValue
    private Long meetingID;
    @OneToOne
    @JoinColumn(name = "adviser_id")
    private Adviser adviser;
    @OneToOne
    @JoinColumn(name = "group_id")
    private Group group;
    private LocalDateTime start;
    private LocalDateTime end;

    public Meeting() {
    }

    public Meeting(Adviser adviser, Group group, LocalDateTime start) {
        this.adviser = adviser;
        this.group = group;
        this.start = start;
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public void setMeetingID(Long meetingID) {
        this.meetingID = meetingID;
    }

    public Adviser getAdviser() {
        return adviser;
    }

    public void setAdviser(Adviser adviser) {
        this.adviser = adviser;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }
}
