package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Adviser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdviserRepository extends JpaRepository<Adviser, Long> {
}
