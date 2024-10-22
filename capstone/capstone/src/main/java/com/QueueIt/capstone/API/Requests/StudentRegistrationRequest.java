package com.QueueIt.capstone.API.Requests;

public class StudentRegistrationRequest {

    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private String role;

    public StudentRegistrationRequest(String username, String firstname, String lastname, String password, String role) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.role = role;
    }

    public StudentRegistrationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }
}
