package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Services.MeetingService;
import org.hibernate.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/meeting")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

}
