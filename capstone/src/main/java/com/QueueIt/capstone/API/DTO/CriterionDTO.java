package com.QueueIt.capstone.API.DTO;

public class CriterionDTO {
    private String title;
    private String description;

    //create rubric DTO
    public CriterionDTO(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
