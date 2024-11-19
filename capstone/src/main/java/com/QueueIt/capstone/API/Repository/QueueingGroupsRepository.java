package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.QueueingGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueingGroupsRepository extends JpaRepository<QueueingGroups, Long> {
    public QueueingGroups findByAdviserID(Long adviserID);
}
