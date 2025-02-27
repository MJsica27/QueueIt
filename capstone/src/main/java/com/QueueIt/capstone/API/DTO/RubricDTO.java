package com.QueueIt.capstone.API.DTO;

import java.util.List;

public class RubricDTO {
    private String title;
    private String description;
    private List<CriterionDTO> criteria;
    private Boolean isPrivate;
    private Long userID;

    public RubricDTO() {}

    public RubricDTO(String title, String description, List<CriterionDTO> criteria, Boolean isPrivate, Long userID) {
        this.title = title;
        this.description = description;
        this.criteria = criteria;
        this.isPrivate = isPrivate;
        this.userID = userID;
    }

    // Getters
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public List<CriterionDTO> getCriteria() { return criteria; }
    public Boolean getIsPrivate() { return isPrivate; }  // ✅ Ensure this getter exists
    public Long getUserID() { return userID; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCriteria(List<CriterionDTO> criteria) { this.criteria = criteria; }
    public void setIsPrivate(Boolean isPrivate) { this.isPrivate = isPrivate; } // ✅ Ensure setter exists
    public void setUserID(Long userID) { this.userID = userID; }
}
