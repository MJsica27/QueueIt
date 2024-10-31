package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Classroom {
    @Id
    @GeneratedValue
    private Long classID;
    private String subjectName;
    private String subjectCode;
    private Long adviserID;
    private String classCode;
    private String section;
    @ManyToMany
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JoinTable(
            name = "classroom_user",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Student> students;



    public Classroom() {
    }

    public Classroom(String subjectName, String subjectCode, Long adviserID, String classCode, String section) {
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.adviserID = adviserID;
        this.classCode = classCode;
        this.section = section;
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

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String getClassCode() { return classCode; }

    public void setClassCode(String classCode) { this.classCode = classCode; }

    public String getSection() { return section; }

    public void setSection(String section) { this.section = section; }
}
