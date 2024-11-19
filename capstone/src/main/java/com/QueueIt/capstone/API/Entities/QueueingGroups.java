package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;

@Entity
public class QueueingGroups {
    @Id
    @GeneratedValue
    private Long queueID;
    private Long adviserID;
    @OneToMany
    private List<Group> groups;
    @OneToMany
    private List<Group> onHoldGroups;
    @OneToOne
    private Group tendingGroup;
    private Time timeEnds;
    private Boolean isActive;


    public QueueingGroups() {
    }

    public QueueingGroups(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getQueueID() {
        return queueID;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public List<Group> getOnHoldGroups() {
        return onHoldGroups;
    }

    public void setOnHoldGroups(List<Group> onHoldGroups) {
        this.onHoldGroups = onHoldGroups;
    }

    public Group getTendingGroup() {
        return tendingGroup;
    }

    public void setTendingGroup(Group tendingGroup) {
        this.tendingGroup = tendingGroup;
    }

    public Time getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(Time timeEnds) {
        this.timeEnds = timeEnds;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
