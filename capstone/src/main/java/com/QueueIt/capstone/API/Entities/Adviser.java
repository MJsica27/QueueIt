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
    private String availableTime;
    private List<String> expertise;
    private Boolean isReady;
    private Long cateringClassID;
    private String introMessage;

    public Adviser() {
    }

    public Adviser(User user) {
        this.user = user;
        this.availableTime = null;
        this.expertise = null;
        this.isReady = Boolean.FALSE;
        this.cateringClassID = (long) -1;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(String availableTime) {
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

    public Long getCateringClassID() {
        return cateringClassID;
    }

    public void setCateringClassID(Long cateringClassID) {
        this.cateringClassID = cateringClassID;
    }

    public String getIntroMessage() {
        return introMessage;
    }

    public void setIntroMessage(String introMessage) {
        this.introMessage = introMessage;
    }
}
