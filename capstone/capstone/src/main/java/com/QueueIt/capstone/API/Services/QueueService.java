package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class QueueService {

    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private AdviserRepository adviserRepository;

    public ResponseEntity<Object> adviserOpenQueue(AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest) {
        try{
            Adviser adviser = adviserRepository.findById(adviserOpenCloseQueueRequest.getAdviserID()).orElseThrow();
            adviser.setReady(Boolean.TRUE);
            adviserRepository.save(adviser);
            simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+adviser.getUser().getUserID(),adviser);
            return ResponseEntity.ok("Successfully opened queueing.");
        }catch (Exception e){
            return ResponseEntity.status(401).body(e.toString());
        }
    }
    public ResponseEntity<Object> adviserCloseQueue(AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest) {
        try{
            Adviser adviser = adviserRepository.findById(adviserOpenCloseQueueRequest.getAdviserID()).orElseThrow();
            adviser.setReady(Boolean.FALSE);
            adviserRepository.save(adviser);
            simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+adviser.getUser().getUserID(),adviser);
            return ResponseEntity.ok("Successfully terminated queueing.");
        }catch (Exception e){
            return ResponseEntity.status(401).body("Adviser not found.");
        }
    }
}
