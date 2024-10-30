package com.QueueIt.capstone.API.Requests;

import java.sql.Time;
import java.util.List;
import com.QueueIt.capstone.API.Entities.User;

public class ModifyAdviserProfileRequest {
    private User userUpdateData;
    private List<Time> availableTime;
    private List<String> expertise;
    private String currentPassword;  
    private String newPassword;      

    // Getters and Setters
    public User getUserUpdateData() {
        return userUpdateData;
    }

    public void setUserUpdateData(User userUpdateData) {
        this.userUpdateData = userUpdateData;
    }

    public List<Time> getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(List<Time> availableTime) {
        this.availableTime = availableTime;
    }

    public List<String> getExpertise() {
        return expertise;
    }

    public void setExpertise(List<String> expertise) {
        this.expertise = expertise;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
