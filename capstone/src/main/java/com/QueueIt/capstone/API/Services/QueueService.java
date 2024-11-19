package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Repository.*;
import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

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

    @Autowired
    private QueueingGroupsRepository queueingGroupsRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Object> adviserOpenQueue(AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest) {
        try{
            //update adviser queueing status
            Adviser adviser = adviserRepository.findById(adviserOpenCloseQueueRequest.getAdviserID()).orElseThrow();
            adviser.setReady(Boolean.TRUE);
            adviserRepository.save(adviser);

            //save time ends when queue is opened and is set isActive to TRUE
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());
            queueingGroups.setTimeEnds(adviserOpenCloseQueueRequest.getTimeEnds());
            queueingGroups.setActive(Boolean.TRUE);
            queueingGroupsRepository.save(queueingGroups);

            //broadcast to subscribers after saving
            simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+adviser.getUser().getUserID(),adviser);
            return ResponseEntity.ok("Successfully opened queueing.");
        }catch (Exception e){
            return ResponseEntity.status(401).body(e.toString());
        }
    }
    public ResponseEntity<Object> adviserCloseQueue(AdviserOpenCloseQueueRequest adviserOpenCloseQueueRequest) {
        try{
            //update adviser queueing status
            Adviser adviser = adviserRepository.findById(adviserOpenCloseQueueRequest.getAdviserID()).orElseThrow();
            adviser.setReady(Boolean.FALSE);
            adviserRepository.save(adviser);

            //clear time ends and set isActive to FALSE
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());
            queueingGroups.setTimeEnds(null);
            queueingGroups.setActive(Boolean.FALSE);
            queueingGroupsRepository.save(queueingGroups);

            //broadcast after saving
            simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+adviser.getUser().getUserID(),adviser);
            return ResponseEntity.ok("Successfully terminated queueing.");
        }catch (Exception e){
            return ResponseEntity.status(401).body("Adviser not found.");
        }
    }

    public ResponseEntity<Object> adviserAdmitQueueingTeam(Meeting meeting) {
        try{
            Group group = groupRepository.findById(meeting.getGroup().getGroupID()).orElseThrow();
            Adviser adviser = adviserRepository.findById(meeting.getAdviser().getUser().getUserID()).orElseThrow();
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());

            //set tending group to broadcast to recent subscribers
            queueingGroups.setTendingGroup(group);
            queueingGroups.getGroups().remove(group);
            queueingGroupsRepository.save(queueingGroups);

            //set meeting starting date/time to now.
            meeting.setStart(LocalDateTime.now());

            //save
            meetingRepository.save(meeting);

            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/tendingTeam/"+adviser.getUser().getUserID(),group);
            return ResponseEntity.ok("Meeting started.");
        }catch (Exception e){
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }

    public ResponseEntity<Object> adviserConcludeMeeting(Long meetingID, HttpServletRequest request) {
        try{
            //get meeting or throw exception if wala
            Meeting meeting = meetingRepository.findById(meetingID).orElseThrow();
            //set meeting end date/time to now
            meeting.setEnd(LocalDateTime.now());
            //save
            meetingRepository.save(meeting);
            return ResponseEntity.ok("Meeting concluded.");

        }catch (Exception e){
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }

    public ResponseEntity<Object> getQueueingTeams(Long adviserID) {
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            return ResponseEntity.ok(queueingGroups);
        }catch (NoSuchElementException nse){
            return ResponseEntity.status(404).body("Adviser not found.");
        }catch (Exception e){
            return ResponseEntity.status(500).build();
        }
    }


    public ResponseEntity<Object> studentEnqueue(Long adviserID, Long groupID) {
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            Group group = groupRepository.findById(groupID).orElseThrow();
            if (queueingGroups.getGroups().contains(group)){
                return ResponseEntity.badRequest().body("Group already in queue");
            }
            queueingGroups.getGroups().add(group);
            queueingGroupsRepository.save(queueingGroups);
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/adviser/enqueue/"+adviserID,group);
            group.getStudents().clear();
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/enqueue/"+adviserID,group);
            return ResponseEntity.ok("Group enqueued");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Student not found");
        }
    }

    public ResponseEntity<Object> studentDequeue(Long adviserID, Long studentID, Long classID){
        try{
            List<Group> groupList = groupRepository.findByClassID(classID);
            User student = userRepository.findById(studentID).orElseThrow();
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            for (Group group:groupList){
                if (group.getStudents().contains(student)){
                    if (queueingGroups.getGroups().contains(group)){
                        queueingGroups.getGroups().remove(group);
                        queueingGroupsRepository.save(queueingGroups);
                        simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/adviser/dequeue/"+adviserID,group);
                        group.getStudents().clear();
                        simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/dequeue/"+adviserID,group);
                        return ResponseEntity.ok("Group dequeued");
                    }
                    return ResponseEntity.badRequest().body("Group is not in queue");
                }
            }
            return ResponseEntity.notFound().build();
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Student not found");
        }
    }


}
