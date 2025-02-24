package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import org.hibernate.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;
}
