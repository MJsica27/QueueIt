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

//    @GetMapping("/getMeetingCount")
//    public ResponseEntity<Object> getMeetingCount(@RequestParam Long classID, @RequestParam Long groupID){
//        return meetingService.getMeetingCount(classID,groupID);
//    }

    @GetMapping("/getActive")
    public ResponseEntity<Object> getActiveMeeting(@RequestParam Long groupID){
        try{
            Meeting meeting = meetingService.getActiveMeeting(groupID);
            return ResponseEntity.ok(meeting);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Meeting does not exist.");
        }catch (NonUniqueResultException e){
            return ResponseEntity.status(500).body("Duplicate entries returned for non-concluded meetings. Please contact administrator.");
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}
