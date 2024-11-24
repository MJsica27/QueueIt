package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "Groups")
public class Group {
    @Id
    @GeneratedValue
    private Long groupID;
    private Long classID;
    private Long mentorID;
    private String groupName;
    private String section;
    private String subjectCode;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "group_user",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> students;
    private Boolean isQueueing;
    private Time queueingTimeStart;

    public Group() {
    }

    public Group(Long classID, Long mentorID, String groupName) {
        this.classID = classID;
        this.groupName = groupName;
    }

    public Long getGroupID() {
        return groupID;
    }

    public void setGroupID(Long groupID) {
        this.groupID = groupID;
    }

    public Long getClassID() {
        return classID;
    }

    public void setClassID(Long classID) {
        this.classID = classID;
    }

    public Long getMentorID() {
        return mentorID;
    }

    public void setMentorID(Long mentorID) {
        this.mentorID = mentorID;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }

    public Time getQueueingTimeStart() {
        return queueingTimeStart;
    }

    public void setQueueingTimeStart(Time queueingTimeStart) {
        this.queueingTimeStart = queueingTimeStart;
    }

    public Boolean getQueueing() {
        return isQueueing;
    }

    public void setQueueing(Boolean queueing) {
        isQueueing = queueing;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }
}