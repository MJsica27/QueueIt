package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Journal;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JournalRepository extends JpaRepository<Journal,Long> {

    public List<Journal> findByStudentIDAndClassID(Long studentID, Long classID, Sort sort);

    public Optional<Journal> findByWeekNumberAndStudentID(Long weekNumber, Long studentID);
}
