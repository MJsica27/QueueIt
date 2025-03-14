package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.DTO.RubricDTO;
import com.QueueIt.capstone.API.Entities.Rubric;
import com.QueueIt.capstone.API.Services.RubricService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/rubrics")
public class RubricController {
    private final RubricService rubricService;

    public RubricController(RubricService rubricService) {
        this.rubricService = rubricService;
    }

    @PostMapping("/create")
    public ResponseEntity<Rubric> createRubric(@RequestBody RubricDTO rubricDTO) {
        return ResponseEntity.ok(rubricService.createRubric(rubricDTO));
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Rubric>> getUserRubrics(@PathVariable Long userID) {
        return ResponseEntity.ok(rubricService.getRubrics(userID));
    }

    @PutMapping("/update")
    public ResponseEntity<Rubric> updateRubric(@RequestBody Rubric updatedRubricInstance) {
        return ResponseEntity.ok(rubricService.updateRubric(updatedRubricInstance));
    }

    @DeleteMapping("/delete/{rubricID}")
    public ResponseEntity<String> deleteRubric(@PathVariable Long rubricID) {
        return rubricService.deleteRubric(rubricID)
                ? ResponseEntity.ok("Rubric deleted successfully")
                : ResponseEntity.notFound().build();
    }

}
