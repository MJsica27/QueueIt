package com.QueueIt.capstone.API.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Admin {
    @Id
    private Long adminID;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user_id")
    @MapsId
    private User user;


    public Admin() {
    }

    public Admin(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}