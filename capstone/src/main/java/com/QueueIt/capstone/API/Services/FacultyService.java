package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.FacultyDTO;
import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.QueueingManager;
import com.QueueIt.capstone.API.Middlewares.ClassroomNotFoundException;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Repository.ClassroomRepository;
import com.QueueIt.capstone.API.Repository.QueueingManagerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FacultyService {

    private static final Logger log = LoggerFactory.getLogger(FacultyService.class);
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private QueueingManagerRepository queueingManagerRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

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
}
