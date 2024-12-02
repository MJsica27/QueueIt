package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Note {
    @Id
    @GeneratedValue
    private Long noteID;
    private Long groupID;
    private Long adviserID;
    private Long noteTakerUserID;
    private Date dateTaken;
    private String subject;
    @Column(columnDefinition = "TEXT")
    private String body;

    public Note() {
    }

    public Note(Long groupID, Long adviserID, Long noteTakerUserID, String subject, String body) {
        this.groupID = groupID;
        this.adviserID = adviserID;
        this.noteTakerUserID = noteTakerUserID;
        this.subject = subject;
        this.body = body;
    }

    public Note(Long noteID, Long groupID, Long adviserID, Long noteTakerUserID, Date dateTaken, String subject, String body) {
        this.noteID = noteID;
        this.groupID = groupID;
        this.adviserID = adviserID;
        this.noteTakerUserID = noteTakerUserID;
        this.dateTaken = dateTaken;
        this.subject = subject;
        this.body = body;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getNoteID() {
        return noteID;
    }

    public Long getGroupID() {
        return groupID;
    }

    public Long getNoteTakerUserID() {
        return noteTakerUserID;
    }

    public Date getDateTaken() {
        return dateTaken;
    }

    public void setDateTaken(Date dateTaken) {
        this.dateTaken = dateTaken;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
