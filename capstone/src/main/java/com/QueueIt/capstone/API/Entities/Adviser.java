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
    private List<Long> cateringClasses;
    private String introMessage;

    public Adviser() {
    }

    public Adviser(User user) {
        this.user = user;
        this.availableTime = null;
        this.expertise = null;
        this.isReady = Boolean.FALSE;
        this.cateringClasses = null;
        this.introMessage = null;
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

    public List<Long> getCateringClasses() {
        return cateringClasses;
    }

    public void setCateringClasses(List<Long> cateringClasses) {
        this.cateringClasses = cateringClasses;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public String getIntroMessage() {
        return introMessage;
    }

    public void setIntroMessage(String introMessage) {
        this.introMessage = introMessage;
    }
}
