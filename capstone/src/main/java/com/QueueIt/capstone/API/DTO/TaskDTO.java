package com.QueueIt.capstone.API.DTO;

public class TaskDTO {
    private String taskName;
    private String taskDescription;

    public TaskDTO(String taskName, String taskDescription) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }
}
