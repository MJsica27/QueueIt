package com.QueueIt.capstone.API.Miscellaneous;

import com.QueueIt.capstone.API.Entities.User;

public class ModifyStudentProfileRequest {
    private String currentPassword;
    private User userUpdateData;

    // Getters and Setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public User getUserUpdateData() {
        return userUpdateData;
    }

    public void setUserUpdateData(User userUpdateData) {
        this.userUpdateData = userUpdateData;
    }
}
