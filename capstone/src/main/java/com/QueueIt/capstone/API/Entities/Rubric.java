package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Rubric {
    @GeneratedValue
    @Id
    private Long rubricID;
    private String title;
    private String description;

    @OneToMany(mappedBy = "rubric", cascade = CascadeType.ALL)
    private List<Criterion> criteria;
    private Boolean isPrivate;
    private Long userID;

    public Rubric() {
    }

    public Rubric(String title, String description, List<Criterion> criteria, Boolean isPrivate, Long userID) {
        this.title = title;
        this.description = description;
        this.criteria = criteria;
        this.isPrivate = isPrivate;
        this.userID = userID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCriteria(List<Criterion> criteria) {
        this.criteria = criteria;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getRubricID() {
        return rubricID;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<Criterion> getCriteria() {
        return criteria;
    }

    public Boolean getPrivate() {
        return isPrivate;
    }

    public Long getUserID() {
        return userID;
    }
}
