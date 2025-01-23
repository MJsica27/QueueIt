package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Journal;
import com.QueueIt.capstone.API.Entities.Note;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProgressTrackingService {

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

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Optional<Note> getNote(Long noteID) {
        return noteRepository.findById(noteID);
    }

    public Note createNote(Note note) {
        if (adviserRepository.findById(note.getAdviserID()).isPresent() && groupRepository.findById(note.getGroupID()).isPresent() && userRepository.findById(note.getNoteTakerUserID()).isPresent()){
            User user = userRepository.findById(note.getNoteTakerUserID()).orElseThrow();
            //if user that created the note is a student, but is not part of the group, returns null.
            if (user.getRole().equals("STUDENT") && !groupService.studentExistInGroup(note.getGroupID(), note.getNoteTakerUserID())){
                return null;
            }
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

    public Object getStudentJournal(Long studentID, Long classID) {
//        if either student or classroom does not exist
        if (studentRepository.findById(studentID).isEmpty() || classroomRepository.findById(classID).isEmpty()){
            throw new NoSuchElementException();
        }
        Sort sort = Sort.by(Sort.Direction.ASC, "weekNumber");
//        this naturally throws a no such element exception kay JPA man
        return journalRepository.findByStudentIDAndClassID(studentID,classID, sort);
    }

    public Journal createJournal(Journal journal) throws NoSuchElementException{
        // if either student or classroom does not exist
        Student student = studentRepository.findById(journal.getStudentID()).orElseThrow();
        if (classroomRepository.findById(journal.getClassID()).isEmpty()){
            throw new NoSuchElementException();
        }
        if (journalRepository.findByWeekNumberAndStudentID(journal.getWeekNumber(), journal.getStudentID()).isPresent()){
            return null;
        }
        journal.setStudentName(student.getUser().getFirstname()+' '+student.getUser().getLastname());
        journal.setEntryDate(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
        return journalRepository.save(journal);
    }

    public Boolean deleteJournal(Long journalID) {
        journalRepository.deleteById(journalID);
        return Boolean.TRUE;
    }

    public Boolean updateJournal(Journal journal) {
        if (studentRepository.findById(journal.getStudentID()).isEmpty() || classroomRepository.findById(journal.getClassID()).isEmpty()) {
            throw new NoSuchElementException();
        }
        Journal studentJournal = journalRepository.findById(journal.getJournalID()).orElseThrow();
        studentJournal.setBody(journal.getBody());
        studentJournal.setEntryDate(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
        journalRepository.save(studentJournal);
        return Boolean.TRUE;
    }

}
