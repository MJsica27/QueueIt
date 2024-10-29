package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Groups")
public class Group {
    @Id
    @GeneratedValue
    private Long groupID;
    private Long classID;
    private Long mentorID;
    private String groupName;
    @ManyToMany
    @JoinTable(
            name = "group_user",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> students;
}
