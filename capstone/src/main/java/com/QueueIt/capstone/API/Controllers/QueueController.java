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


    @PostMapping("/adviser/admit")
    public ResponseEntity<Object> adviserAdmitQueueingTeam(@RequestParam Long adviserID, @RequestParam Long groupID){
        return queueService.adviserAdmitQueueingTeam(adviserID, groupID);
    }


    @PostMapping("/adviser/conclude")
    public ResponseEntity<Object> adviserConcludeMeeting(@RequestParam Long meetingID){
        return queueService.adviserConcludeMeeting(meetingID);
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
    public ResponseEntity<Object> studentDequeue(@RequestParam Long adviserID, @RequestParam Long groupID){
        return queueService.studentDequeue(adviserID, groupID);
    }

    @PostMapping("/student/holdQueue")
    public ResponseEntity<Object> studentHoldQueue(@RequestParam Long adviserID, @RequestParam Long groupID){
        return queueService.studentHoldQueue(adviserID, groupID);
    }

    @PostMapping("/student/requeue")
    public ResponseEntity<Object> studentRequeue(@RequestParam Long adviserID, @RequestParam Long groupID){
        return queueService.studentRequeue(adviserID,groupID);
    }
}
