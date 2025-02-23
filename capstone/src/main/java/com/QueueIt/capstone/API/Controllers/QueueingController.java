package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.DTO.QueueingEntryDTO;
import com.QueueIt.capstone.API.Middlewares.*;
import com.QueueIt.capstone.API.Services.QueueingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/queue")
public class QueueingController {

    @Autowired
    private QueueingService queueingService;

    @PostMapping("/enqueue")
    public ResponseEntity<Object> enqueueTeam(@RequestBody QueueingEntryDTO queueingEntryDTO){
        try{
            queueingService.enqueueTeam(queueingEntryDTO);
            return ResponseEntity.ok("Your team is now in the line.");
        }catch (QueueingManagerNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (DuplicateQueueingEntryException | QueueingManagerInactiveException | QueueingCapacityExceeded e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/dequeue")
    public ResponseEntity<Object> dequeueTeam(@RequestBody QueueingEntryDTO queueingEntryDTO){
        try{
            queueingService.dequeueTeam(queueingEntryDTO);
            return ResponseEntity.ok("Your team is now removed from the line.");
        }catch (QueueingEntryNotFoundException | QueueingManagerNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/goOnHold")
    public ResponseEntity<Object> setTeamOnHold(@RequestBody QueueingEntryDTO queueingEntryDTO){
        try {
            queueingService.setTeamOnHold(queueingEntryDTO);
            return ResponseEntity.ok("Your team is now set to hold.");
        }catch (QueueingEntryNotFoundException | QueueingManagerNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (AlreadyOnHoldException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/requeue")
    public ResponseEntity<Object> requeue(@RequestBody QueueingEntryDTO queueingEntryDTO){
        try {
            queueingService.requeueTeam(queueingEntryDTO);
            return ResponseEntity.ok("Your team is now back to active.");
        }catch (QueueingEntryNotFoundException | QueueingManagerNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (AlreadyOnHoldException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
