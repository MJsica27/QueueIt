package com.QueueIt.capstone.API.Miscellaneous;

public class EnrollStudentRequest {
    private Long classID;
    private Long userID;

    public EnrollStudentRequest() {
    }

    public EnrollStudentRequest(Long classID, Long userID) {
        this.classID = classID;
        this.userID = userID;
    }

    public Long getClassID() {
        return classID;
    }

    public void setClassID(Long classID) {
        this.classID = classID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
