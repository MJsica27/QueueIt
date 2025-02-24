package com.QueueIt.capstone.API.DTO;


import com.QueueIt.capstone.API.Entities.Attendance;

import java.util.List;

public class QueueingEntryDTO {
    private Long queueingEntryID;
    private Long facultyID;
    private Long teamID;
    private String teamName;
    private String classReference;
    private List<Attendance> attendanceList;

    public QueueingEntryDTO() {
    }

    //DTO for Enqueue
    public QueueingEntryDTO(Long facultyID, Long teamID, String teamName, String classReference, List<Attendance> attendanceList) {
        this.facultyID = facultyID;
        this.teamID = teamID;
        this.teamName = teamName;
        this.classReference = classReference;
        this.attendanceList = attendanceList;
    }

    //DTO for Dequeue
    //DTO for Admit Queueing Entry
    public QueueingEntryDTO(Long queueingEntryID, Long facultyID) {
        this.queueingEntryID = queueingEntryID;
    }

    public String getClassReference() {
        return classReference;
    }

    public Long getFacultyID() {
        return facultyID;
    }

    public Long getTeamID() {
        return teamID;
    }

    public String getTeamName() {
        return teamName;
    }

    public List<Attendance> getAttendanceList() {
        return attendanceList;
    }

    public Long getQueueingEntryID() {
        return queueingEntryID;
    }
}
