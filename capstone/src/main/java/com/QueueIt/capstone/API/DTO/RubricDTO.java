package com.QueueIt.capstone.API.DTO;

import java.util.List;

public class RubricDTO {
    private String title;
    private String description;
    private Boolean isPrivate;
    private Long userID;
    private List<CriterionDTO> criteria;

    public RubricDTO(String title, String description, Boolean isPrivate, Long userID, List<CriterionDTO> criteria) {
        this.title = title;
        this.description = description;
        this.isPrivate = isPrivate;
        this.userID = userID;
        this.criteria = criteria;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getPrivate() {
        return isPrivate;
    }

    public Long getUserID() {
        return userID;
    }

    public List<CriterionDTO> getCriteria() {
        return criteria;
    }
}
