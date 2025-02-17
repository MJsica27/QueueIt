package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;

@Entity
public class QueueingManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long queueingManagerID;
    @Column(unique = true)
    private Long facultyID;
    private Time timeEnds;
    private Boolean isActive;
    private Long cateringLimit;
    @OneToMany(mappedBy = "queueingManager", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<QueueingEntry> queueingEntries;
    @ManyToMany(mappedBy = "queueingManagers")
    private List<Classroom> cateredClassrooms;

    public QueueingManager() {
    }

    public QueueingManager(Long facultyID) {
        this.facultyID = facultyID;
    }

    public void setCateredClassrooms(List<Classroom> cateredClassrooms) {
        this.cateredClassrooms = cateredClassrooms;
    }

    public List<Classroom> getCateredClassrooms() {
        return cateredClassrooms;
    }

    public void setTimeEnds(Time timeEnds) {
        this.timeEnds = timeEnds;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public void setCateringLimit(Long cateringLimit) {
        this.cateringLimit = cateringLimit;
    }

    public Long getQueueingManagerID() {
        return queueingManagerID;
    }

    public Long getFacultyID() {
        return facultyID;
    }

    public Time getTimeEnds() {
        return timeEnds;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public Long getCateringLimit() {
        return cateringLimit;
    }

    public int queueLength(){
        return this.queueingEntries.size();
    }


}
