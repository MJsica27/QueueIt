package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.GroupRepository;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class QueueService {

    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private AdviserRepository adviserRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private MeetingRepository meetingRepository;

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

    public ResponseEntity<Object> adviserAdmitQueueingTeam(Meeting meeting) {
        try{
            if (groupRepository.findById(meeting.getGroup().getGroupID()).isPresent() && adviserRepository.findById(meeting.getAdviser().getUser().getUserID()).isPresent()){
                meeting.setStart(LocalDateTime.now());
                meetingRepository.save(meeting);
                return ResponseEntity.ok("");
            }else{
                return ResponseEntity.status(422).body("Unprocessable request.");
            }
        }catch (Exception e){
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }

    public ResponseEntity<Object> adviserConcludeMeeting(Long meetingID, HttpServletRequest request) {
        try{
            Meeting meeting = meetingRepository.findById(meetingID).orElseThrow();
            meeting.setEnd(LocalDateTime.now());
            meetingRepository.save(meeting);
            return ResponseEntity.ok("");

        }catch (Exception e){
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }
}
