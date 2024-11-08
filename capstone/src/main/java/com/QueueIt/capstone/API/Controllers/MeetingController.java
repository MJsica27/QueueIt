package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Services.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meeting")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @GetMapping("/getMeetingCount")
    public ResponseEntity<Object> getMeetingCount(@RequestParam Long classID, @RequestParam Long groupID){
        return meetingService.getMeetingCount(classID,groupID);
    }
}
