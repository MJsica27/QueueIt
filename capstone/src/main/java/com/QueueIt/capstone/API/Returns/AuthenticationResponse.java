package com.QueueIt.capstone.API.Returns;

import com.QueueIt.capstone.API.Entities.User;

public class AuthenticationResponse {

    private User user;
    private String token;

    public AuthenticationResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public AuthenticationResponse() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
