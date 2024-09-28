package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

@Entity
public class Classroom {
    @Id
    @GeneratedValue
    private Long classID;
    private String subjectName;
    private String subjectCode;
    @ManyToOne
    @JoinColumn(name = "adviser_id")
    private Adviser adviser;

    public Classroom() {
    }

    public Classroom(Long classID, String subjectName, String subjectCode, Adviser adviser) {
        this.classID = classID;
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.adviser = adviser;
    }

    public Long getClassID() {
        return classID;
    }

    public void setClassID(Long classID) {
        this.classID = classID;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public Adviser getAdviser() {
        return adviser;
    }

    public void setAdviser(Adviser adviser) {
        this.adviser = adviser;
    }
}
