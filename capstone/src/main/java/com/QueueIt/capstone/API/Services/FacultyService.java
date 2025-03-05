package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.ConcludeMeetingDTO;
import com.QueueIt.capstone.API.DTO.FacultyDTO;
import com.QueueIt.capstone.API.DTO.GradeDTO;
import com.QueueIt.capstone.API.DTO.QueueingEntryDTO;
import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.QueueIt.capstone.API.Middlewares.ClassroomNotFoundException;
import com.QueueIt.capstone.API.Middlewares.QueueingEntryNotFoundException;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Repository.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import com.QueueIt.capstone.API.Repositories.CriterionRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FacultyService {

    private static final Logger log = LoggerFactory.getLogger(FacultyService.class);
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private QueueingManagerRepository queueingManagerRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private QueueingEntryRepository queueingEntryRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private CriterionRepository criterionRepository;

    @Autowired
    private GradeRepository gradeRepository;

    public Boolean facultyOpenQueueing(FacultyDTO facultyDTO){
        QueueingManager queueingManager = null;
        try{
            queueingManager =   queueingManagerRepository
                                                .findByFacultyID(facultyDTO.getFacultyID())
                                                .orElseThrow(()->new QueueingManagerNotFoundException("Queueing Manager not found."));
        }catch (QueueingManagerNotFoundException e){
            //creates a new QueueingManager entry in the database
            queueingManager = createQueueingManager(facultyDTO.getFacultyID());
        }

        if(queueingManager == null){
            return Boolean.FALSE;
        }
        log.info("facultyDTO: "+facultyDTO.getCateringLimit().toString());
        queueingManager.setIsActive(Boolean.TRUE);
        queueingManager.setTimeEnds(facultyDTO.getTimeEnds());
        queueingManager.setCateringLimit(facultyDTO.getCateringLimit());
        queueingManagerRepository.save(queueingManager);
        QueueingManager finalQueueingManager = queueingManager;
        if (!facultyDTO.isAllClassrooms()){
            facultyDTO.getCateredClassrooms().forEach(
                    classroomID -> {
                        try{
                            Classroom foo = classroomRepository
                                    .findById(classroomID)
                                    .orElseThrow(()->new ClassroomNotFoundException("Classroom does not exist."));
//                            finalQueueingManager.getCateredClassrooms().add(foo);
                            foo.addQueueingManager(finalQueueingManager);
                        }catch (ClassroomNotFoundException e){
                            Classroom foo = new Classroom(classroomID);
                            foo.addQueueingManager(finalQueueingManager);
                            classroomRepository.save(foo);
                        }
                    }
            );
        }else{
            // Clear the catered classrooms and remove the reference from each Classroom
            for (Classroom classroom : new ArrayList<>(queueingManager.getCateredClassrooms())) {
                classroom.getQueueingManagers().remove(queueingManager); // Remove the reference from Classroom
            }
            queueingManager.getCateredClassrooms().clear(); // Clear the list
        }



        simpMessageSendingOperations.convertAndSend("/topic/facultyActivity/adviser/"+facultyDTO.getFacultyID(), queueingManager);
        return Boolean.TRUE;
    }

    public Boolean facultyCloseQueueing(Long facultyID) throws QueueingManagerNotFoundException {
        QueueingManager queueingManager = queueingManagerRepository
                .findByFacultyID(facultyID)
                .orElseThrow(()-> new QueueingManagerNotFoundException("Queueing Manager not found"));

        for (Classroom classroom : new ArrayList<>(queueingManager.getCateredClassrooms())) {
            classroom.getQueueingManagers().remove(queueingManager); // Remove the reference from Classroom
        }
        queueingManager.getCateredClassrooms().clear(); // Clear the list
        queueingManager.goInactive();
        queueingManagerRepository.save(queueingManager);
        simpMessageSendingOperations.convertAndSend("/topic/facultyActivity/adviser/"+facultyID, queueingManager);
        return Boolean.TRUE;
    }

    public QueueingManager createQueueingManager(Long facultyID){
        try{
            QueueingManager queueingManager = new QueueingManager(facultyID);
            return queueingManagerRepository.save(queueingManager);
        } catch (Exception e){
            return null;
        }
    }

    public QueueingManager getFacultyQueueingManager(Long facultyID) throws QueueingManagerNotFoundException {
        return queueingManagerRepository
                .findByFacultyID(facultyID)
                .orElseThrow(()-> new QueueingManagerNotFoundException("Queueing Manager not found"));
    }

    @Transactional
    public Boolean admitQueueingEntry(QueueingEntryDTO queueingEntryDTO) throws QueueingEntryNotFoundException, QueueingManagerNotFoundException {
        QueueingEntry queueingEntry = queueingEntryRepository
                .findById(queueingEntryDTO.getQueueingEntryID())
                .orElseThrow(()-> new QueueingEntryNotFoundException("Queueing entry not found"));

        QueueingManager queueingManager = queueingManagerRepository
                .findById(queueingEntry.getQueueingManager().getQueueingManagerID())
                .orElseThrow(()->new QueueingManagerNotFoundException("Queueing manager not found."));

        Meeting meeting = new Meeting(
            MeetingStatus.QUEUEING_CONDUCTED,
            queueingEntry,
            queueingManager
        );

        meetingRepository.save(meeting);

        queueingManager.setQueueingEntryToTending(queueingEntry, meeting);

        queueingManagerRepository.save(queueingManager);

        simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/" + queueingManager.getFacultyID(), queueingManager.getQueueingEntries());
        simpMessageSendingOperations.convertAndSend("/topic/facultyActivity/adviser/"+queueingManager.getFacultyID(), queueingManager);

        return Boolean.TRUE;
    }

    @Transactional
    public void concludeMeeting(ConcludeMeetingDTO concludeMeetingDTO) {
        Meeting meeting = meetingRepository.findById(concludeMeetingDTO.getGrades().getFirst().getMeetingID())
                .orElseThrow(()->new RuntimeException("Meeting not found."));

        concludeMeetingDTO.getGrades().forEach(gradeDTO -> {
            Criterion criterion = criterionRepository.findById(gradeDTO.getCriterionID())
                    .orElseThrow(() -> new RuntimeException("Criterion with id " + gradeDTO.getCriterionID() + " not found"));
            Grade tempGrade = new Grade(
                    meeting,
                    criterion,
                    gradeDTO.getStudentName(),
                    gradeDTO.getMark()
            );
            Grade savedGrade = gradeRepository.save(tempGrade);
            meeting.getGrades().add(savedGrade);
        });

        // Ensure meeting and gradeList are set correctly
        meeting.setEnd(LocalDateTime.now());
        meeting.setNotedAssignedTasks(concludeMeetingDTO.getNotedAssignedTasks());
        meeting.setImpedimentsEncountered(concludeMeetingDTO.getImpedimentsEncountered());
        // Save changes
        meetingRepository.save(meeting);

        QueueingManager queueingManager = queueingManagerRepository.findById(meeting.getQueueingManager().getQueueingManagerID())
                        .orElseThrow(()-> new RuntimeException("Queueing Manager not found."));

        queueingManager.setMeeting(null);

        queueingManagerRepository.save(queueingManager);

        simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/" + meeting.getQueueingManager().getFacultyID(), queueingManager.getQueueingEntries());
        simpMessageSendingOperations.convertAndSend("/topic/facultyActivity/adviser/"+queueingManager.getFacultyID(), queueingManager);
    }

}
