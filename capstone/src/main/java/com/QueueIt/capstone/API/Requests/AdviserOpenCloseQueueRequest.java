package com.QueueIt.capstone.API.Requests;

import java.sql.Time;

public class AdviserOpenCloseQueueRequest {
    private Long adviserID;
    private Boolean queueStatus;
    private Time timeEnds;
    private Long classID;
    private String message;

    public AdviserOpenCloseQueueRequest() {
    }

    public AdviserOpenCloseQueueRequest(Long adviserID, Time timeEnds, Long classID, String message) {
        this.adviserID = adviserID;
        this.timeEnds = timeEnds;
        this.classID = classID;
        this.message = message;
    }

    public AdviserOpenCloseQueueRequest(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Boolean getQueueStatus() {
        return queueStatus;
    }

    public void setQueueStatus(Boolean queueStatus) {
        this.queueStatus = queueStatus;
    }

    public Time getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Time timeEnds) {
        this.timeEnds = timeEnds;
    }

    public Long getClassID() {
        return classID;
    }

    public void setClassID(Long classID) {
        this.classID = classID;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
