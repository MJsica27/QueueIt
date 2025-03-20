package com.QueueIt.capstone.API.DTO;

import com.QueueIt.capstone.API.Entities.Attendance;
import com.QueueIt.capstone.API.Entities.Grade;

import java.util.List;

public class AttendanceGradeEditionDTO {
    private Long meetingID;
    private String firstName;
    private String lastName;
    private Attendance attendance;
    private List<Grade> grade;

    public AttendanceGradeEditionDTO() {
    }

    //for controller parameters
    public AttendanceGradeEditionDTO(Long meetingID, String firstName, String lastName) {
        this.meetingID = meetingID;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //for return data
    public AttendanceGradeEditionDTO(Attendance attendance, List<Grade> grade) {
        this.attendance = attendance;
        this.grade = grade;
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public Attendance getAttendance() {
        return attendance;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public List<Grade> getGrade() {
        return grade;
    }
}

