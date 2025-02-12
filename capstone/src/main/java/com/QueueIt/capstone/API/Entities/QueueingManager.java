//package com.QueueIt.capstone.API.Entities;
//
//import jakarta.persistence.*;
//
//import java.sql.Time;
//import java.util.List;
//
//@Entity
//public class QueueingManager {
//    @Id
//    @GeneratedValue
//    private Long queueID;
//    private Long adviserID;
//    @OneToMany
//    private List<Group> queueingGroups;
//    @OneToMany
//    private List<Group> onHoldGroups;
//    @OneToOne
//    private Group tendingGroup;
//    private Time timeEnds;
//    private Boolean isActive;
//    private Long cateringLimit;
//
//    public QueueingManager() {
//    }
//
//    public QueueingManager(Long adviserID) {
//        this.adviserID = adviserID;
//    }
//
//    public Long getQueueID() {
//        return queueID;
//    }
//
//    public Long getAdviserID() {
//        return adviserID;
//    }
//
//    public List<Group> getQueueingGroups() {
//        return queueingGroups;
//    }
//
//    public void setQueueingGroups(List<Group> queueingGroups) {
//        this.queueingGroups = queueingGroups;
//    }
//
//    public List<Group> getOnHoldGroups() {
//        return onHoldGroups;
//    }
//
//    public void setOnHoldGroups(List<Group> onHoldGroups) {
//        this.onHoldGroups = onHoldGroups;
//    }
//
//    public Group getTendingGroup() {
//        return tendingGroup;
//    }
//
//    public void setTendingGroup(Group tendingGroup) {
//        this.tendingGroup = tendingGroup;
//    }
//
//    public Time getTimeEnds() {
//        return timeEnds;
//    }
//
//    public void setTimeEnds(Time timeEnds) {
//        this.timeEnds = timeEnds;
//    }
//
//    public Boolean getActive() {
//        return isActive;
//    }
//
//    public void setActive(Boolean active) {
//        isActive = active;
//    }
//
//    public Long getCateringLimit() {
//        return cateringLimit;
//    }
//
//    public void setCateringLimit(Long cateringLimit) {
//        this.cateringLimit = cateringLimit;
//    }
//
//    public Boolean canEnqueueTeam(){
//        if ((this.queueingGroups.size() + this.onHoldGroups.size()) < this.cateringLimit){
//            return Boolean.TRUE;
//        }
//        return Boolean.FALSE;
//    }
//}
