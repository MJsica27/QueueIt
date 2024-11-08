package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    @Query("SELECT COUNT(m) FROM Meeting m WHERE m.group.classID = :classID AND m.group.groupID = :groupID")
    long countMeetingsByClassIdAndGroupId(@Param("classID") Long classID, @Param("groupID") Long groupID);
}
