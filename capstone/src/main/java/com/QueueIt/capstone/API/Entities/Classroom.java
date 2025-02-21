package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Classroom {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long classroomID;
//    private Long facultyID;
    @ManyToMany
    @JoinTable(
            name = "QMClassroomFilters",
            joinColumns = @JoinColumn(name="classroomID"),
            inverseJoinColumns = @JoinColumn(name="queueingManagerID")

    )
    private List<QueueingManager> queueingManagers;

    public Classroom() {
    }

    public Classroom(Long classroomID, Long facultyID) {
        this.classroomID = classroomID;
//        this.facultyID = facultyID;
    }

//    public Long getFacultyID() {
//        return facultyID;
//    }

    public Long getClassroomID() {
        return classroomID;
    }
}
