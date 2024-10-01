package com.QueueIt.capstone.API.Miscellaneous;

import java.sql.Time;
import java.util.List;

import com.QueueIt.capstone.API.Entities.User;

public class ModifyAdviserProfileRequest {
    private User userUpdateData;
    private List<Time> availableTime;
    private List<String> expertise;

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
}

