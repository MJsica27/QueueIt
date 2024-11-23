package com.QueueIt.capstone.API.Requests;

public class ChatRequest {
    private Long userID;
    private Long adviserID;
    private String message;

    public ChatRequest() {
    }

    public ChatRequest(Long userID, Long adviserID, String message) {
        this.userID = userID;
        this.adviserID = adviserID;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
