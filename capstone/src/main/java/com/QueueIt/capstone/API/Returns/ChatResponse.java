package com.QueueIt.capstone.API.Returns;

public class ChatResponse {
    private Long userID;
    private String firstname;
    private String lastname;
    private String photoURL;
    private String message;

    public ChatResponse() {
    }

    public ChatResponse(Long userID, String firstname, String lastname, String photoURL, String message) {
        this.userID = userID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.photoURL = photoURL;
        this.message = message;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
