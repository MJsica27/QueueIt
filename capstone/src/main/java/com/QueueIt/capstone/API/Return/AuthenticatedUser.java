package com.QueueIt.capstone.API.Return;

import com.QueueIt.capstone.API.Entities.User;

public class AuthenticatedUser {
    private User user;
    private int role;

    public AuthenticatedUser() {
    }

    public AuthenticatedUser(User user, int role) {
        this.user = user;
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
