package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.Entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {


    @Query("SELECT new com.QueueIt.capstone.API.DTO.MeetingDTO(" +
            "m.notedAssignedTasks, " +
            "m.impedimentsEncountered, " +
            "m.start, " +
            "m.end, " +
            "m.queueingEntry,"+
            "m.meetingStatus) " +
            "FROM Meeting m JOIN m.queueingEntry qe WHERE qe.teamID = :teamID AND m.end IS NOT NULL")
    public List<MeetingDTO> retrieveMeetingsForTeam(@Param("teamID") Long teamID);


    @Query("SELECT m FROM Meeting m JOIN m.queueingEntry qe WHERE qe.teamID = :teamID AND m.end IS NOT NULL")
    public List<Meeting> retrieveAllMeetingsForSummary(Long teamID);

    @Query("SELECT m FROM Meeting m " +
            "JOIN m.queueingEntry qe " + // Join with QueueingEntry
            "JOIN qe.queueingManager qm " + // Join with QueueingManager through QueueingEntry
            "WHERE m.start > :now " +
            "AND qm.facultyID = :facultyID " + // Use qm.facultyID to filter
            "AND m.meetingStatus = com.QueueIt.capstone.API.Enums.MeetingStatus.SET_MANUALLY")
    List<Meeting> retrieveAppointmentsForFaculty(@Param("facultyID") Long facultyID, @Param("now") LocalDateTime now);
}
