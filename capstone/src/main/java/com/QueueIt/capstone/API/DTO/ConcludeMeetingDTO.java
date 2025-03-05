package com.QueueIt.capstone.API.DTO;

import java.util.List;

public class ConcludeMeetingDTO {
    private List<GradeDTO> grades;
    private String notedAssignedTasks;
    private String impedimentsEncountered;

    public ConcludeMeetingDTO(List<GradeDTO> grades, String notedAssignedTasks, String impedimentsEncountered) {
        this.grades = grades;
        this.notedAssignedTasks = notedAssignedTasks;
        this.impedimentsEncountered = impedimentsEncountered;
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
