package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Note;
import com.QueueIt.capstone.API.Services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping("/get")
    public ResponseEntity<Object> getNote(@RequestParam Long noteID){
        try{
            Note note = noteService.getNote(noteID).orElseThrow();
            return ResponseEntity.ok(note);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createNote(@RequestBody Note note){
        Note myNote = noteService.createNote(note);
        if (myNote == null){
            return ResponseEntity.unprocessableEntity().body("Group or Adviser does not exist. Or student is not part of the group.");
        }
        return ResponseEntity.ok("Note created.");
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateNote(@RequestBody Note note){
        if (noteService.updateNote(note) == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Note updated");
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteNote(@RequestParam Long noteID){
        if (noteService.deleteNote(noteID)){
            return ResponseEntity.ok("Note deleted");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAllByGroupAndAdviser")
    public ResponseEntity<Object> getNotesByGroupAndAdviser(@RequestParam Long groupID, @RequestParam Long adviserID){
        List<Note> notes = noteService.getNotesByGroupAndAdviser(groupID,adviserID);
        if (notes.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notes);
    }
}
