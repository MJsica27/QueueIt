package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Journal {
    @Id
    @GeneratedValue
    private Long journalID;
    private Long studentID;
    private Long classID;
    private Long weekNumber;
    @Column(columnDefinition = "TEXT")
    private String body;
    private Date entryDate;
    private String studentName;

    public Journal() {
    }

    public Journal(Long userID, Long classID, Long weekNumber, String body) {
        this.studentID = userID;
        this.classID = classID;
        this.weekNumber = weekNumber;
        this.body = body;
    }

    public Journal(Long journalID, Long studentID, Long classID, Long weekNumber, String body) {
        this.journalID = journalID;
        this.studentID = studentID;
        this.classID = classID;
        this.body = body;
    }

    public Long getJournalID() {
        return journalID;
    }

    public Long getStudentID() {
        return studentID;
    }

    public void setStudentID(Long studentID) {
        this.studentID = studentID;
    }

    public Long getClassID() {
        return classID;
    }

    public void setClassID(Long classID) {
        this.classID = classID;
    }

    public Long getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(Long weekNumber) {
        this.weekNumber = weekNumber;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
