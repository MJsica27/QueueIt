package com.QueueIt.capstone.API.Requests;

import com.QueueIt.capstone.API.Entities.Classroom;

import java.sql.Time;
import java.util.List;

public class AdviserOpenCloseQueueRequest {
    private Long adviserID;
    private Boolean queueStatus;
    private String timeEnds;
    private List<Long> cateringClasses;
    private String message;
    private Long cateringLimit;

    public AdviserOpenCloseQueueRequest() {
    }

    public AdviserOpenCloseQueueRequest(Long adviserID, String timeEnds, List<Long> cateringClasses, String message, Long cateringLimit) {
        this.adviserID = adviserID;
        this.timeEnds = timeEnds;
        this.cateringClasses = cateringClasses;
        this.message = message;
        this.cateringLimit = cateringLimit;
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

    public String getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(String timeEnds) {
        this.timeEnds = timeEnds;
    }

    public List<Long> getCateringClasses() {
        return cateringClasses;
    }

    public void setCateringClasses(List<Long> cateringClasses) {
        this.cateringClasses = cateringClasses;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getCateringLimit() {
        return cateringLimit;
    }

    public void setCateringLimit(Long cateringLimit) {
        this.cateringLimit = cateringLimit;
    }
}
