package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import com.QueueIt.capstone.API.Services.QueueService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/queue")
public class QueueController {
    @Autowired
    private QueueService queueService;

    @PostMapping("/adviser/open")
    public ResponseEntity<Object> adviserOpenQueue(@RequestBody AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest){
        return queueService.adviserOpenQueue(adviserOpenCloseQueueRequest);
    }

    @PostMapping("/adviser/close")
    public ResponseEntity<Object> adviserCloseQueue(@RequestBody AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest){
        return queueService.adviserCloseQueue(adviserOpenCloseQueueRequest);
    }

    //request body is Meeting because if you check its constructor, it only needs classID, groupID and start date/time.
    @PostMapping("/adviser/admit")
    public ResponseEntity<Object> adviserAdmitQueueingTeam(@RequestBody Meeting meeting){
        return queueService.adviserAdmitQueueingTeam(meeting);
    }


    @PostMapping("/adviser/conclude")
    public ResponseEntity<Object> adviserConcludeMeeting(@RequestBody Long meetingID, HttpServletRequest request){
        return queueService.adviserConcludeMeeting(meetingID,request);
    }

    @GetMapping("/getQueueingTeams")
    public ResponseEntity<Object> getQueueingTeams(@RequestParam Long adviserID){
        return queueService.getQueueingTeams(adviserID);
    }

    @PostMapping("/student/enqueue")
    public ResponseEntity<Object> studentEnqueue(@RequestParam Long adviserID, @RequestParam Long groupID){
        return queueService.studentEnqueue(adviserID, groupID);
    }

    @PostMapping("/student/dequeue")
    public ResponseEntity<Object> studentDequeue(@RequestParam Long adviserID, @RequestParam Long studentID, @RequestParam Long classID){
        return queueService.studentDequeue(adviserID, studentID, classID);
    }
}
