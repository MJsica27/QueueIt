package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.DTO.FacultyDTO;
import com.QueueIt.capstone.API.Entities.QueueingManager;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping("/isActive/{facultyID}")
    private ResponseEntity<HashMap<String, Object>> isFacultyActive(@PathVariable Long facultyID){
        try{
            HashMap<String, Object> isActive = facultyService.isFacultyActive(facultyID);
            return ResponseEntity.ok(isActive);
        } catch (QueueingManagerNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

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
