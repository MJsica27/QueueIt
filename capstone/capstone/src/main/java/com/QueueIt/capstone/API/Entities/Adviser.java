package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Adviser{
    @Id
    private Long adviserID;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user_id")
    @MapsId
    private User user;
    private List<Time> availableTime;
    private List<String> expertise;
    private Boolean isReady;

    public Adviser() {
    }

    public Adviser(User user) {
        this.user = user;
        this.availableTime = null;
        this.expertise = null;
        this.isReady = Boolean.FALSE;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Boolean getReady() {
        return isReady;
    }

    public void setReady(Boolean ready) {
        isReady = ready;
    }
}
