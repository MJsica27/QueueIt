package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.DTO.RubricDTO;
import com.QueueIt.capstone.API.Services.RubricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rubric")
public class RubricController {

    @Autowired
    private RubricService rubricService;

    @PostMapping("/create")
    public ResponseEntity<Object> createRubric(@RequestBody RubricDTO rubricDTO){
        rubricService.createRubric(rubricDTO);
        return ResponseEntity.ok("Rubric created.");
    }
}
