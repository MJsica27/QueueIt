package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Team {
    @Id
    private Long teamID;
    private String teamName;
    private String courseCode;
    private String section;
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Member> memberIds;
    @OneToOne(mappedBy = "team", cascade = CascadeType.ALL)
    @JsonBackReference
    private QueueingEntry queueingEntry;

    public Team() {
    }

    public Team(Long teamID, String teamName, String courseCode, String section, List<Member> memberIds, QueueingEntry queueingEntry) {
        this.teamID = teamID;
        this.teamName = teamName;
        this.courseCode = courseCode;
        this.section = section;
        this.memberIds = memberIds;
        this.queueingEntry = queueingEntry;
    }

    public Long getTeamID() {
        return teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public List<Member> getMemberIds() {
        return memberIds;
    }

    public void setMemberIds(List<Member> memberIds) {
        this.memberIds = memberIds;
    }

    public QueueingEntry getQueueingEntry() {
        return queueingEntry;
    }

    public void setQueueingEntry(QueueingEntry queueingEntry) {
        this.queueingEntry = queueingEntry;
    }
}
