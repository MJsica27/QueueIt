package com.QueueIt.capstone.API.Requests;

import com.QueueIt.capstone.API.Entities.User;

public class ModifyStudentProfileRequest {
    private String passedCurrentPassword;
    private User userUpdateData;

    // Getters and Setters
    public String getPassedCurrentPassword() {
        return passedCurrentPassword;
    }

    public void setPassedCurrentPassword(String currentPassword) {
        this.passedCurrentPassword = currentPassword;
    }

    public User getUserUpdateData() {
        return userUpdateData;
    }

    public void setUserUpdateData(User userUpdateData) {
        this.userUpdateData = userUpdateData;
    }
}
