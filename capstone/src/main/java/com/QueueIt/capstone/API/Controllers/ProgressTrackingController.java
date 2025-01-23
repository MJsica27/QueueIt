package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Journal;
import com.QueueIt.capstone.API.Entities.Note;
import com.QueueIt.capstone.API.Services.ProgressTrackingService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/note")
public class ProgressTrackingController {

    @Autowired
    private ProgressTrackingService progressTrackingService;

    @GetMapping("/get")
    public ResponseEntity<Object> getNote(@RequestParam Long noteID){
        try{
            Note note = progressTrackingService.getNote(noteID).orElseThrow();
            return ResponseEntity.ok(note);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createNote(@RequestBody Note note){
        Note myNote = progressTrackingService.createNote(note);
        if (myNote == null){
            return ResponseEntity.unprocessableEntity().body("Group or Adviser does not exist. Or student is not part of the group.");
        }
        return ResponseEntity.ok(myNote);
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateNote(@RequestBody Note note){
        if (progressTrackingService.updateNote(note) == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Note updated");
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteNote(@RequestParam Long noteID){
        if (progressTrackingService.deleteNote(noteID)){
            return ResponseEntity.ok("Note deleted");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAllByGroupAndAdviser")
    public ResponseEntity<Object> getNotesByGroupAndAdviser(@RequestParam Long groupID, @RequestParam Long adviserID){
        List<Note> notes = progressTrackingService.getNotesByGroupAndAdviser(groupID,adviserID);
        if (notes.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/getStudentJournal")
    public ResponseEntity<Object> getStudentJournal(@RequestParam Long studentID, @RequestParam Long classID ){
         try{
             return ResponseEntity.ok(progressTrackingService.getStudentJournal(studentID,classID));
         }catch (NoSuchElementException e){
             return ResponseEntity.notFound().build();
         }
    }

    @PostMapping("/createJournal")
    public ResponseEntity<Object> createJournal(@RequestBody Journal journal){
        try{
            Journal journal1 = progressTrackingService.createJournal((journal));
            if (journal1 != null){
                return ResponseEntity.ok(journal1);
            }
            return ResponseEntity.badRequest().build();
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

//    @PostMapping("/deleteJournal")
//    public ResponseEntity<Object> deleteJournal(@RequestParam Long journalID){
//        try{
//            if (progressTrackingService.deleteJournal(journalID)){
//                return ResponseEntity.ok("Journal deleted.");
//            }
//            return ResponseEntity.badRequest().build();
//        }catch (NoSuchElementException e){
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("/updateJournal")
    public ResponseEntity<Object> updateJournal(@RequestBody Journal journal){
        try{
            if (progressTrackingService.updateJournal(journal)){
                return ResponseEntity.ok("Journal updated");
            }
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
