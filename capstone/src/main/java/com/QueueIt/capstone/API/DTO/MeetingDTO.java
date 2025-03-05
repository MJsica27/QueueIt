package com.QueueIt.capstone.API.DTO;

import com.QueueIt.capstone.API.Entities.Attendance;
import com.QueueIt.capstone.API.Entities.QueueingEntry;
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


    public MeetingDTO(String notedAssignedTasks, String impedimentsEncountered, LocalDateTime start, LocalDateTime end, QueueingEntry queueingEntry) {
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
        this.start = start;
        this.end = end;
        this.queueingEntry = queueingEntry;
    }

    public MeetingDTO(String notedAssignedTasks, String impedimentsEncountered, LocalDateTime start, LocalDateTime end, List<Attendance> attendanceList) {
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
        this.start = start;
        this.end = end;
        this.attendanceList = attendanceList;
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
}