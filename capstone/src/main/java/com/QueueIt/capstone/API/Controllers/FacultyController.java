package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.DTO.FacultyDTO;
import com.QueueIt.capstone.API.Entities.QueueingManager;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Services.FacultyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {

    private static final Logger log = LoggerFactory.getLogger(FacultyController.class);
    @Autowired
    private FacultyService facultyService;

    @GetMapping("/getQueueingManager/{facultyID}")
    private ResponseEntity<Object> getFacultyQueueingManager(@PathVariable Long facultyID){
        try{
            QueueingManager queueingManager = facultyService.getFacultyQueueingManager(facultyID);
            return ResponseEntity.ok(queueingManager);
        }catch (QueueingManagerNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/openQueueing")
    private ResponseEntity<Object> facultyOpenQueueing(@RequestBody FacultyDTO facultyDTO){
        log.info(facultyDTO.toString());
        Boolean isOpen = facultyService.facultyOpenQueueing(facultyDTO);
        return ResponseEntity.ok("Queueing successfully opened.");
    }

    @PostMapping("/closeQueueing/{facultyID}")
    private ResponseEntity<Object> facultyCloseQueueing(@PathVariable Long facultyID){
        try{
            Boolean isClose = facultyService.facultyCloseQueueing(facultyID);
            return ResponseEntity.ok("Queueing closed.");
        }catch (QueueingManagerNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

}
