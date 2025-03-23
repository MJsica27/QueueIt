package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.DTO.*;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Enums.AttendanceStatus;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {


    @Query("SELECT new com.QueueIt.capstone.API.DTO.MeetingDTO(" +
            "m.meetingID,"+
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



    @Query(
            "SELECT new com.QueueIt.capstone.API.DTO.LowestEngagementDTO(qe.teamName, COUNT(m.meetingID)) " +
                    "FROM Meeting m " +
                    "JOIN m.queueingEntry qe " +
                    "JOIN qe.queueingManager qm " +
                    "WHERE qe.classroomID = :classroomID " +
                    "AND (m.meetingStatus = :attend_faculty OR m.meetingStatus = :attend_queueing) " +
                    "GROUP BY qe.teamName " +
                    "HAVING COUNT(m.meetingID) < (SELECT COUNT(m2.meetingID) * 0.25 FROM Meeting m2 " +
                    "JOIN m2.queueingEntry qe2 WHERE qe2.classroomID = :classroomID) " + // 25% of total meetings
                    "ORDER BY COUNT(m.meetingID) ASC"
    )
    List<LowestEngagementDTO> getLowestEngagingTeamMentor(
            @Param("classroomID") Long classroomID,
            @Param("attend_faculty") MeetingStatus status1,
            @Param("attend_queueing") MeetingStatus status2,
            Pageable pageable
    );



    @Query(
            "SELECT new com.QueueIt.capstone.API.DTO.StudentAtRiskForKickOut(" +
                    "a.firstname, a.lastname, COUNT(DISTINCT a.attendanceID), AVG(g.mark), " +
                    "(SUM(CASE WHEN a.attendanceStatus = :attendanceStatus THEN 1 ELSE 0 END) * 100.0 / COUNT(a.attendanceID))" +
                    ") " +
                    "FROM Meeting m " +
                    "JOIN m.queueingEntry qe " +
                    "JOIN qe.attendanceList a " +
                    "JOIN m.grades g " +
                    "WHERE qe.classroomID = :classroomID " +
                    "GROUP BY a.firstname, a.lastname " +
                    "HAVING AVG(g.mark) < 3 OR " +
                    "(SUM(CASE WHEN a.attendanceStatus = :attendanceStatus THEN 1 ELSE 0 END) * 100.0 / COUNT(a.attendanceID)) < 60"
    )
    List<StudentAtRiskForKickOut> getStudentsAtRiskForKickOut(
            @Param("classroomID") Long classroomID,
            @Param("attendanceStatus") AttendanceStatus attendanceStatus
    );



    @Query(
            "SELECT new com.QueueIt.capstone.API.DTO.TopTeam(qe.teamName, AVG(g.mark)) " +
                    "FROM Meeting m JOIN m.queueingEntry qe " +
                    "JOIN m.grades g " +
                    "WHERE qe.classroomID = :classroomID " +
                    "GROUP BY qe.teamName " +
                    "ORDER BY AVG(g.mark) DESC"
    )
    List<TopTeam> topThreeTeams(
            @Param("classroomID") Long classroomID,
            Pageable pageable
    );


    @Query(
            "SELECT new com.QueueIt.capstone.API.DTO.PieChartObservation(qm.facultyName, count(m.meetingID)) " +
                    "FROM Meeting m " +
                    "JOIN m.queueingEntry qe " +
                    "JOIN qe.queueingManager qm " +
                    "WHERE qe.classroomID = :classroomID " +
                    "GROUP BY qm.facultyName"
    )
    List<PieChartObservation> meetingCountPerFaculty(@Param("classroomID") Long classroomID);


//    @Query(
//            "SELECT new com.QueueIt.capstone.API.DTO.ScatterPlotObservation( " +
//                    "   qe.teamName, " +
//                    "   AVG(g.mark), " +  // Correctly computes team-wide grade avg
//                    "   COUNT(DISTINCT m.meetingID) " +  // Correctly counts unique meetings
//                    ") " +
//                    "FROM Meeting m " +
//                    "JOIN m.queueingEntry qe " +
//                    "JOIN Grade g ON g.meeting = m " +
//                    "WHERE qe.classroomID = :classroomID " +
//                    "AND (m.meetingStatus = :attendQueueing OR m.meetingStatus = :attendFaculty) " +
//                    "GROUP BY qe.teamName"
//    )
    @Query(
            "SELECT new com.QueueIt.capstone.API.DTO.ScatterPlotObservation( " +
                    "   qe.teamName, " +
                    "   AVG(g.mark), " +  // Directly compute team-wide grade average
                    "   COUNT(DISTINCT m.meetingID) " +  // Correct meeting count
                    ") " +
                    "FROM Meeting m " +
                    "JOIN m.queueingEntry qe " +
                    "JOIN Grade g ON g.meeting = m " +  // Join Grade directly
                    "WHERE (m.meetingStatus = :attendQueueing OR m.meetingStatus = :attendFaculty) " +
                    "AND qe.classroomID = :classroomID " +
                    "GROUP BY qe.teamName"
    )
    List<ScatterPlotObservation> getTeamsPerformance(
            @Param("classroomID") Long classroomID,
            @Param("attendQueueing") MeetingStatus status1,  // Matches JPQL
            @Param("attendFaculty") MeetingStatus status2   // Matches JPQL
    );











}
