package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    public Optional<Note> findByGroupIDAndAdviserID(Long groupID, Long adviserID);

    public List<Note> findAllByGroupIDAndAdviserID(Long groupID, Long adviserID);
}
