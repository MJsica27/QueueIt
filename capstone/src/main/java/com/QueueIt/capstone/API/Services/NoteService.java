package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Note;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.GroupRepository;
import com.QueueIt.capstone.API.Repository.NoteRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private AdviserRepository adviserRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    public Optional<Note> getNote(Long noteID) {
        return noteRepository.findById(noteID);
    }

    public Note createNote(Note note) {
        if (adviserRepository.findById(note.getAdviserID()).isPresent() && groupRepository.findById(note.getGroupID()).isPresent() && userRepository.findById(note.getNoteTakerUserID()).isPresent() && groupService.studentExistInGroup(note.getGroupID(), note.getNoteTakerUserID())){
            note.setDateTaken(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            return noteRepository.save(note);
        }
        return null;
    }

    public Note updateNote(Note note) {
        if (noteRepository.findById(note.getNoteID()).isPresent()){
            return noteRepository.save(note);
        }
        return null;
    }

    public Boolean deleteNote(Long noteID) {
        if (noteRepository.findById(noteID).isPresent()){
            noteRepository.deleteById(noteID);
            return Boolean.TRUE;
        }else{
            return Boolean.FALSE;
        }
    }

    public List<Note> getNotesByGroupAndAdviser(Long groupID, Long adviserID) {
        return noteRepository.findAllByGroupIDAndAdviserID(groupID,adviserID);
    }
}
