package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Member {
    @Id
    private Long memberID;
    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonBackReference
    private Team team;

    public Member(Long memberID) {
        this.memberID = memberID;
    }

    public Long getMemberID() {
        return memberID;
    }

    public void setMemberID(Long memberID) {
        this.memberID = memberID;
    }

    public Team getTeam() {
        return team;
    }
}
