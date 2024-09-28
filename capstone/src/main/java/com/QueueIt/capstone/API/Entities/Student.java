//package com.QueueIt.capstone.API.Entities;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//
//@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer"})
//public class Student{
//    @Id
//    private Long studentID;
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "fk_user_id")
//    @MapsId
//    private User user;
//    private Long classCode;
//    private String subjectCode;
//    private Long groupID;
//
//    public Student() {
//    }
//
//    public Student(User user, Long classCode, String subjectCode) {
//        this.user = user;
//        this.classCode = classCode;
//        this.subjectCode = subjectCode;
//        this.groupID = null;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Long getClassCode() {
//        return classCode;
//    }
//
//    public void setClassCode(Long classCode) {
//        this.classCode = classCode;
//    }
//
//    public String getSubjectCode() {
//        return subjectCode;
//    }
//
//    public void setSubjectCode(String subjectCode) {
//        this.subjectCode = subjectCode;
//    }
//
//    public Long getGroupID() {
//        return groupID;
//    }
//
//    public void setGroupID(Long groupID) {
//        this.groupID = groupID;
//    }
//}
