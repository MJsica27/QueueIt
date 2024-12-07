package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    @Query("SELECT m FROM Meeting m WHERE m.groupID = :groupID AND m.end IS NULL")
    public Optional<Meeting> getActiveMeeting(@Param("groupID") Long groupID);
}
