package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    public List<Group> findByClassID(Long classID);
}
