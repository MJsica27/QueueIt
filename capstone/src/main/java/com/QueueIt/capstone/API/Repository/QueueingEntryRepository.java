package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.QueueingEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueingEntryRepository extends JpaRepository<QueueingEntry, Long> {
}
