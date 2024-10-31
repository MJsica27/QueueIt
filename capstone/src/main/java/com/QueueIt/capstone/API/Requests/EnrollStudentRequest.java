package com.QueueIt.capstone.API.Requests;

public class EnrollStudentRequest {
    private Long userID;
    private String classCode;

    public EnrollStudentRequest() {
    }

    public EnrollStudentRequest(Long userID, String classCode) {
        this.userID = userID;
        this.classCode = classCode;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }
}
