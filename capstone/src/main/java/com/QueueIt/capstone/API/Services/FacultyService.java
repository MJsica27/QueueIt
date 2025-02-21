package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.FacultyDTO;
import com.QueueIt.capstone.API.Entities.QueueingManager;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Repository.QueueingManagerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class FacultyService {

    private static final Logger log = LoggerFactory.getLogger(FacultyService.class);
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private QueueingManagerRepository queueingManagerRepository;

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

        queueingManager.setIsActive(Boolean.TRUE);
        queueingManager.setTimeEnds(facultyDTO.getTimeEnds());
        queueingManager.setCateringLimit(facultyDTO.getCateringLimit());
        queueingManagerRepository.save(queueingManager);

        HashMap<String, Object> context = new HashMap<>();
        context.put("isActive",Boolean.TRUE);
        context.put("cateringClasses",queueingManager.getCateredClassrooms());
        if (queueingManager.queueLength() == 0){
            context.put("queueSize",0);
        }else{
            context.put("queueSize",queueingManager.queueLength());
        }
        simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+facultyDTO.getFacultyID(), context);
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

    public HashMap<String, Object> isFacultyActive(Long facultyID) throws QueueingManagerNotFoundException {

        QueueingManager queueingManager =   queueingManagerRepository
                .findByFacultyID(facultyID)
                .orElseThrow(()->new QueueingManagerNotFoundException("Queueing Manager not found."));
        HashMap<String, Object> context = new HashMap<>();
        context.put("isActive",queueingManager.getIsActive());
        context.put("cateringClasses",queueingManager.getCateredClassrooms());
        context.put("queueSize",queueingManager.queueLength());
        return context;
    }

    public Boolean facultyCloseQueueing(Long facultyID) throws QueueingManagerNotFoundException {
        QueueingManager queueingManager = queueingManagerRepository
                .findByFacultyID(facultyID)
                .orElseThrow(()-> new QueueingManagerNotFoundException("Queueing Manager not found"));

        queueingManager.setIsActive(Boolean.FALSE);
        queueingManagerRepository.save(queueingManager);
        HashMap<String, Object> context = new HashMap<>();
        context.put("isActive", Boolean.FALSE);
        simpMessageSendingOperations.convertAndSend("/topic/queueStatus/adviser/"+facultyID, context);
        return Boolean.TRUE;
    }

    public QueueingManager getFacultyQueueingManager(Long facultyID) throws QueueingManagerNotFoundException {
        return queueingManagerRepository
                .findByFacultyID(facultyID)
                .orElseThrow(()-> new QueueingManagerNotFoundException("Queueing Manager not found"));
    }
}
