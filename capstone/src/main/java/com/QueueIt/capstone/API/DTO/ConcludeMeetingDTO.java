package com.QueueIt.capstone.API.DTO;

import com.QueueIt.capstone.API.Entities.Attendance;

import java.util.List;

public class ConcludeMeetingDTO {
    private List<GradeDTO> grades;
    private String notedAssignedTasks;
    private String impedimentsEncountered;
    private List<Attendance> attendanceList;
    private Long queueingManagerID;

    public ConcludeMeetingDTO() {
    }

    public ConcludeMeetingDTO(List<GradeDTO> grades, String notedAssignedTasks, String impedimentsEncountered) {
        this.grades = grades;
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
    }

    public ConcludeMeetingDTO(List<GradeDTO> grades, String notedAssignedTasks, String impedimentsEncountered, List<Attendance> attendanceList, Long queueingManagerID) {
        this.grades = grades;
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
        this.attendanceList = attendanceList;
        this.queueingManagerID = queueingManagerID;
    }

    public Long getQueueingManagerID() {
        return queueingManagerID;
    }

    public List<Attendance> getAttendanceList() {
        return attendanceList;
    }

    public List<GradeDTO> getGrades() {
        return grades;
    }

    public String getNotedAssignedTasks() {
        return notedAssignedTasks;
    }

    public String getImpedimentsEncountered() {
        return impedimentsEncountered;
    }
}
