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

    @GetMapping("/teamMeetings/{teamID}")
    public ResponseEntity<Object> retrieveMeetingsForMeetingBoard(@PathVariable Long teamID){
        return ResponseEntity.ok(meetingService.retrieveMeetingsForMeetingBoard(teamID));
    }

    @GetMapping("/teamMeetings/generateSummary/{teamID}")
    public ResponseEntity<Object> generateSummaryReport(@PathVariable Long teamID){
        return ResponseEntity.ok(meetingService.generateSummaryReport(teamID));
    }
}
