package com.QueueIt.capstone.API.DTO;

public class GradeDTO {
    private Long meetingID;
    private Long criterionID;
    private String editionNote;
    private String studentName;
    private Float mark;

    public GradeDTO(Long meetingID, Long criterionID, String editionNote, String studentName, Float grade) {
        this.meetingID = meetingID;
        this.criterionID = criterionID;
        this.editionNote = editionNote;
        this.studentName = studentName;
        this.mark = grade;
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public Long getCriterionID() {
        return criterionID;
    }

    public String getEditionNote() {
        return editionNote;
    }

    public String getStudentName() {
        return studentName;
    }

    public Float getMark() {
        return mark;
    }

    @Override
    public String toString() {
        return "GradeDTO{" +
                "meetingID=" + meetingID +
                ", criterionID=" + criterionID +
                ", editionNote='" + editionNote + '\'' +
                ", studentName='" + studentName + '\'' +
                ", mark=" + mark +
                '}';
    }
}
