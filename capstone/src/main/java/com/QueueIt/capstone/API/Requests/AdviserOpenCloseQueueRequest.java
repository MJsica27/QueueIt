package com.QueueIt.capstone.API.Requests;

import java.sql.Time;

public class AdviserOpenCloseQueueRequest {
    private Long adviserID;
    private Boolean queueStatus;
    private Time timeEnds;

    public AdviserOpenCloseQueueRequest() {
    }

    public AdviserOpenCloseQueueRequest(Long adviserID, Boolean queueStatus, Time timeEnds) {
        this.adviserID = adviserID;
        this.queueStatus = queueStatus;
        this.timeEnds = timeEnds;
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
}
