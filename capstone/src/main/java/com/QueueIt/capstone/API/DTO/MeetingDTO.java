package com.QueueIt.capstone.API.DTO;

import com.QueueIt.capstone.API.Entities.Attendance;
import com.QueueIt.capstone.API.Entities.QueueingEntry;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;

public class MeetingDTO {
    private String notedAssignedTasks;
    private String impedimentsEncountered;
    private LocalDateTime start;
    private LocalDateTime end;
    @JsonIgnore
    private QueueingEntry queueingEntry;
    private List<Attendance> attendanceList;
    private MeetingStatus meetingStatus;


    //DTO for repository meeting history retrieval for meeting board history


    public MeetingDTO(String notedAssignedTasks, String impedimentsEncountered, LocalDateTime start, LocalDateTime end, QueueingEntry queueingEntry, MeetingStatus meetingStatus) {
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
        this.start = start;
        this.end = end;
        this.queueingEntry = queueingEntry;
        this.meetingStatus = meetingStatus;
    }

    //DTO for response that's to be sent to the frontend
    public MeetingDTO(String notedAssignedTasks, String impedimentsEncountered, LocalDateTime start, LocalDateTime end, List<Attendance> attendanceList, MeetingStatus meetingStatus) {
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
        this.start = start;
        this.end = end;
        this.attendanceList = attendanceList;
        this.meetingStatus = meetingStatus;
    }

    // Getters and Setters (if needed)
    public String getNotedAssignedTasks() {
        return notedAssignedTasks;
    }

    public void setNotedAssignedTasks(String notedAssignedTasks) {
        this.notedAssignedTasks = notedAssignedTasks;
    }

    public String getImpedimentsEncountered() {
        return impedimentsEncountered;
    }

    public void setImpedimentsEncountered(String impedimentsEncountered) {
        this.impedimentsEncountered = impedimentsEncountered;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public QueueingEntry getQueueingEntry() {
        return queueingEntry;
    }

    public void setQueueingEntry(QueueingEntry queueingEntry) {
        this.queueingEntry = queueingEntry;
    }

    public List<Attendance> getAttendanceList() {
        return attendanceList;
    }

    public void setAttendanceList(List<Attendance> attendanceList) {
        this.attendanceList = attendanceList;
    }

    public MeetingStatus getMeetingStatus() {
        return meetingStatus;
    }

    public void setMeetingStatus(MeetingStatus meetingStatus) {
        this.meetingStatus = meetingStatus;
    }
}