package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import com.QueueIt.capstone.API.Services.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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
}
