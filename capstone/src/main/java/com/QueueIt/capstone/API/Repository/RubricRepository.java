package com.QueueIt.capstone.API.Repositories;

import com.QueueIt.capstone.API.Entities.Rubric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RubricRepository extends JpaRepository<Rubric, Long> {
    List<Rubric> findByUserID(Long userID);  // Find rubrics by user
    List<Rubric> findByIsPrivateFalse();  // Find all public (system) rubrics
}
