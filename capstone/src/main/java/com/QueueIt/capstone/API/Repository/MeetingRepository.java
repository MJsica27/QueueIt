package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {


    @Query("SELECT new com.QueueIt.capstone.API.DTO.MeetingDTO(" +
            "m.notedAssignedTasks, " +
            "m.impedimentsEncountered, " +
            "m.start, " +
            "m.end, " +
            "m.queueingEntry,"+
            "m.meetingStatus) " +
            "FROM Meeting m " +
            "JOIN m.queueingEntry qe " +
            "WHERE qe.teamID = :teamID " +
            "AND m.end IS NOT NULL")
    public List<MeetingDTO> retrieveMeetingsForTeam(@Param("teamID") Long teamID);


    @Query("SELECT m FROM Meeting m " +
            "JOIN m.queueingEntry qe " +
            "WHERE qe.teamID = :teamID " +
            "AND m.end IS NOT NULL " +
            "AND m.meetingStatus IN :statusList")
    public List<Meeting> retrieveAllMeetingsForSummary(@Param("teamID") Long teamID,
                                                       @Param("statusList") List<MeetingStatus> statusList);
    @Query("SELECT m FROM Meeting m " +
            "JOIN m.queueingEntry qe " + // Join with QueueingEntry
            "JOIN qe.queueingManager qm " + // Join with QueueingManager through QueueingEntry
            "WHERE m.start > :now " +
            "AND qm.facultyID = :facultyID " + // Use qm.facultyID to filter
            "AND m.meetingStatus = :status")
    List<Meeting> retrieveAppointmentsForFaculty(@Param("facultyID") Long facultyID,
                                                 @Param("now") LocalDateTime now,
                                                 @Param("status") MeetingStatus status);


    @Query("SELECT m FROM Meeting m " +
            "WHERE m.start > :offset " +
            "AND :now >= m.start " +
            "AND m.meetingStatus IN :statusList")
    List<Meeting> retrieveAutomatedMeetings(@Param("offset") LocalDateTime offset,
                                            @Param("now") LocalDateTime now,
                                            @Param("statusList")List<MeetingStatus> statusList);

    @Query("SELECT m FROM Meeting m " +
            "WHERE :offset < m.end " +
            "AND :now >= m.end " +
            "AND m.meetingStatus = :status")
    List<Meeting> retrieveAutomatedMeetingsForDefault(@Param("offset") LocalDateTime offset,
                                                      @Param("now") LocalDateTime now,
                                                      @Param("status") MeetingStatus status);


}
