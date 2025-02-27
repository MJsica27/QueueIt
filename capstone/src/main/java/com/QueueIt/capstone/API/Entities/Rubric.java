package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Rubric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    private String description;

    @OneToMany(mappedBy = "rubric", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Prevent infinite recursion
    private List<Criterion> criteria = new ArrayList<>();

    private Boolean isPrivate;
    private Long userID;

    public Rubric() {}

    public Rubric(String title, String description, List<Criterion> criteria, Boolean isPrivate, Long userID) {
        this.title = title;
        this.description = description;
        this.criteria = criteria;
        this.isPrivate = isPrivate;
        this.userID = userID;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public List<Criterion> getCriteria() { return criteria; }
    public Boolean isPrivate() { return isPrivate; }
    public Long getUserID() { return userID; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCriteria(List<Criterion> criteria) { this.criteria = criteria; }
    public void setIsPrivate(Boolean isPrivate) { this.isPrivate = isPrivate; } // Renamed setter
    public void setUserID(Long userID) { this.userID = userID; }
}
