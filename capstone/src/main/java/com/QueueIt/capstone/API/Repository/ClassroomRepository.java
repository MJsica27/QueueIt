package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
    public List<Classroom> findByAdviserID(Long userID);
}
