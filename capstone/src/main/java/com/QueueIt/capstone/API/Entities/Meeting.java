package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;

@Entity
public class Meeting {

    @Id
    @GeneratedValue
    private Long meetingID;
    private Long adviserID;
    private Long groupID;
    private Time start;
    private Time end;

    public Meeting() {
    }

    public Meeting(Long adviserID, Long groupID) {
        this.adviserID = adviserID;
        this.groupID = groupID;
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public void setMeetingID(Long meetingID) {
        this.meetingID = meetingID;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getGroupID() {
        return groupID;
    }

    public void setGroupID(Long groupID) {
        this.groupID = groupID;
    }

    public Time getStart() {
        return start;
    }

    public void setStart(Time start) {
        this.start = start;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }
}
