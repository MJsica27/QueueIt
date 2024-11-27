package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Repository.*;
import com.QueueIt.capstone.API.Requests.AdviserOpenCloseQueueRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Queue;

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
            //set kung kinsa ang pwede mo queue nga classID
            adviser.setCateringClassID(adviserOpenCloseQueueRequest.getClassID());
            //set nga ready na ang adviser for queueing
            adviser.setReady(Boolean.TRUE);
            //set ang intro message nga mo gawas sa chat feed inig sulod ni student sa queueing page
            adviser.setIntroMessage(adviserOpenCloseQueueRequest.getMessage());
            adviserRepository.save(adviser);

            //update queueing groups object
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());
            //set kanus-a kutob ang queueing
            queueingGroups.setTimeEnds(adviserOpenCloseQueueRequest.getTimeEnds());
            //set is active kay if dili active, palayason tanan users nga nag access sa queueing page.
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
            //set nga dili na siya ready for queueing
            adviser.setReady(Boolean.FALSE);
            //set to default -1, meaning mo cater siya tanan classes / groups
            adviser.setCateringClassID((long) -1);
            //reset ang intro message
            adviser.setIntroMessage(null);
            adviserRepository.save(adviser);

            //update queueing groups
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());
            //clear ang queueing time range
            queueingGroups.setTimeEnds(null);
            //set is active kay if dili active, palayason tanan users nga nag access sa queueing page.
            queueingGroups.setActive(Boolean.FALSE);


            //katong logic nga ang mga naka onhold or wala ma cater ni adviser nga naka queue, i cater next open.


            queueingGroupsRepository.save(queueingGroups);

            //broadcast after saving
            simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+adviser.getUser().getUserID(),adviser);
            return ResponseEntity.ok("Successfully terminated queueing.");
        }catch (Exception e){
            return ResponseEntity.status(401).body("Adviser not found.");
        }
    }

    public ResponseEntity<Object> adviserAdmitQueueingTeam(Long adviserID, Long groupID) {
        try{
            //get the group
            Group group = groupRepository.findById(groupID).orElseThrow();
            //get the adviser
            Adviser adviser = adviserRepository.findById(adviserID).orElseThrow();
            //get the queueing groups for manipulation
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());

            //if si team nga gi admit is onHold, then return bad request [for double security]
            if(queueingGroups.getOnHoldGroups().contains(group)){
                return ResponseEntity.badRequest().build();
            }
            //set si group to tending team
            queueingGroups.setTendingGroup(group);
            //ibot si group sa queueing groups
            queueingGroups.getGroups().remove(group);
            queueingGroupsRepository.save(queueingGroups);

            //set meeting starting date/time to now.
            Meeting meeting = new Meeting(adviserID,groupID);
            meeting.setStart(new Time(System.currentTimeMillis()));

            //save
            meetingRepository.save(meeting);

            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/tendingTeam/"+adviser.getUser().getUserID(),group);
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/dequeue/"+adviser.getUser().getUserID(),group);

            //i return si meeting para inig conclude sa meeting, ma manipulate ang time end.
            return ResponseEntity.ok(meeting);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Object> adviserConcludeMeeting(Long meetingID) {
        try{
            //get meeting or throw exception if wala
            Meeting meeting = meetingRepository.findById(meetingID).orElseThrow();
            //get adviser
            Adviser adviser = adviserRepository.findById(meeting.getAdviserID()).orElseThrow();
            //get queueing groups to manipulate tending groups
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviser.getUser().getUserID());
            //set meeting end date/time to now
            meeting.setEnd(new Time(System.currentTimeMillis()));
            //set queueing groups tending group to null;
            queueingGroups.setTendingGroup(null);
            //save queueing groups
            queueingGroupsRepository.save(queueingGroups);
            //save meeting
            meetingRepository.save(meeting);
            //returnan lang nako ug true, sa frontend lang nako i set ang tending team to null para gamay ra bandwidth kaunon;
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/concludeMeeting/"+adviser.getUser().getUserID(),Boolean.TRUE);
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/tendingTeam/"+adviser.getUser().getUserID(),Boolean.FALSE);
            return ResponseEntity.ok("Meeting concluded.");
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Object> getQueueingTeams(Long adviserID) {
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            queueingGroups.getGroups().sort(Comparator.comparing(Group::getQueueingTimeStart));
            queueingGroups.getOnHoldGroups().sort(Comparator.comparing(Group::getQueueingTimeStart));
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
            group.setQueueingTimeStart(new Time(System.currentTimeMillis()));
            group.setQueueing(Boolean.TRUE);
            groupRepository.save(group);
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

    public ResponseEntity<Object> studentDequeue(Long adviserID, Long groupID){
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            Group group = groupRepository.findById(groupID).orElseThrow();
            if (queueingGroups.getGroups().contains(group)){
                group.setQueueingTimeStart(null);
                group.setQueueing(Boolean.FALSE);
                groupRepository.save(group);
                queueingGroups.getGroups().remove(group);
                queueingGroupsRepository.save(queueingGroups);
                simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/adviser/dequeue/"+adviserID,group);
                group.getStudents().clear();
                simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/dequeue/"+adviserID,group);
                return ResponseEntity.ok("Group dequeued");
            } else if (queueingGroups.getOnHoldGroups().contains(group)) {
                group.setQueueingTimeStart(null);
                groupRepository.save(group);
                queueingGroups.getOnHoldGroups().remove(group);
                queueingGroupsRepository.save(queueingGroups);
                simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/adviser/dequeue/"+adviserID,group);
                group.getStudents().clear();
                simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/dequeue/"+adviserID,group);
                return ResponseEntity.ok("Group dequeued");
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Student not found");
        }
    }


    public ResponseEntity<Object> studentHoldQueue(Long adviserID, Long groupID) {
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            Group group = groupRepository.findById(groupID).orElseThrow();
            if (queueingGroups.getGroups().contains(group)){
                //ibot sa queueing groups
                queueingGroups.getGroups().remove(group);
                //sulod sa on hold groups
                queueingGroups.getOnHoldGroups().add(group);
                //i sort via queueing Start
                queueingGroups.getOnHoldGroups().sort(Comparator.comparing(Group::getQueueingTimeStart));
                //save
                queueingGroupsRepository.save(queueingGroups);
                simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/onHold/"+adviserID,group);
                return ResponseEntity.ok("Group set to hold");
            }
            return ResponseEntity.notFound().build();
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Object> studentRequeue(Long adviserID, Long groupID) {
        try{
            QueueingGroups queueingGroups = queueingGroupsRepository.findByAdviserID(adviserID);
            Group group = groupRepository.findById(groupID).orElseThrow();
            queueingGroups.getOnHoldGroups().remove(group);
            queueingGroups.getGroups().add(group);
            queueingGroups.getGroups().sort(Comparator.comparing(Group::getQueueingTimeStart));
            queueingGroupsRepository.save(queueingGroups);
            simpMessageSendingOperations.convertAndSend("/topic/queueingTeamsStatus/student/requeue/"+adviserID,group);
            return ResponseEntity.ok("Group requeued");
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }
}
