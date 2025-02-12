package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

@Entity
public class Criterion {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long criterionID;
    @ManyToOne
    @JoinColumn(name = "rubric_id")
    private Rubric rubric;
    private String title;
    private String description;
    @OneToOne(mappedBy = "criterion", cascade = CascadeType.ALL)
    private Grade grade;

    public Criterion() {
    }

    public Criterion(Rubric rubric, String title, String description) {
        this.rubric = rubric;
        this.title = title;
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCriterionID() {
        return criterionID;
    }

    public Rubric getRubric() {
        return rubric;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
