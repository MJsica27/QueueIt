package com.QueueIt.capstone.API.Requests;

public class AdviserOpenCloseQueueRequest {
    private Long adviserID;
    private Boolean queueStatus;

    public AdviserOpenCloseQueueRequest() {
    }

    public AdviserOpenCloseQueueRequest(Long adviserID, Boolean queueStatus) {
        this.adviserID = adviserID;
        this.queueStatus = queueStatus;
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
}
