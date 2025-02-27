package com.QueueIt.capstone.API.Repositories;

import com.QueueIt.capstone.API.Entities.Criterion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CriterionRepository extends JpaRepository<Criterion, Long> {
    List<Criterion> findByRubricId(Long rubricId);
}
