package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.*;
import com.QueueIt.capstone.API.Enums.AttendanceStatus;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.QueueIt.capstone.API.Repository.AttendanceRepository;
import com.QueueIt.capstone.API.Repository.GradeRepository;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import com.QueueIt.capstone.API.Utilities.StringUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private QueueingEntryService queueingEntryService;

    public ClassroomAnalyticsDTO generateClassroomAnalytics(Long classroomID){
        return new ClassroomAnalyticsDTO(
                getTop3LowestEngagingTeam(classroomID),
                retrieveTop3AtRiskStudents(classroomID),
                retrieveTopThreeTeams(classroomID),
                retrieveFacultyPerformanceInClassroom(classroomID),
                getTeamsPerformance(classroomID)
        );
    }

    public List<LowestEngagementDTO> getTop3LowestEngagingTeam(Long classroomID){


        Pageable pageable = PageRequest.of(0,3);

        return meetingRepository.getLowestEngagingTeamMentor(
                classroomID,
                MeetingStatus.ATTENDED_FACULTY_CONDUCTED,
                MeetingStatus.ATTENDED_QUEUEING_CONDUCTED,
                pageable);
    }

    public List<StudentAtRiskForKickOut> retrieveTop3AtRiskStudents(Long classroomID){
        if (queueingEntryService.countUniqueTeamsForClassroom(classroomID) == 0){
            return Collections.emptyList();
        }

        return meetingRepository.getStudentsAtRiskForKickOut(
                classroomID,
                AttendanceStatus.PRESENT
        );
    }

    public List<TopTeam> retrieveTopThreeTeams(Long classroomID){
        if (queueingEntryService.countUniqueTeamsForClassroom(classroomID) == 0){
            return Collections.emptyList();
        }
        Pageable pageable = PageRequest.of(0,3);
        return meetingRepository.topThreeTeams(
                classroomID,
                pageable
        );
    }

    public PieChartData retrieveFacultyPerformanceInClassroom(Long classroomID){
        List<PieChartObservation> observations = meetingRepository.meetingCountPerFaculty(classroomID);
        List<String> labels = new ArrayList<>();
        PieChartDataEntry pieChartDataEntry = new PieChartDataEntry(
                new ArrayList<>(),
                new ArrayList<>()
        );
        List<PieChartDataEntry> datasets = new ArrayList<>();
        observations.stream()
                .forEach(pieChartObservation -> {
                    labels.add(pieChartObservation.getFacultyName());
                    pieChartDataEntry.getData().add(pieChartObservation.getMeetingCount());
                });

        for(int i = 0; i < labels.size(); i++){
            pieChartDataEntry.getBackgroundColor().add(StringUtility.randomBackgroundColorString(i));
        }

        datasets.add(pieChartDataEntry);

        return new PieChartData(
                labels,
                datasets
        );
    }

    public ScatterPlotDataset getTeamsPerformance(Long classroomID){
        List<ScatterPlotObservation> observations = meetingRepository.getTeamsPerformance(
                classroomID,
                MeetingStatus.ATTENDED_FACULTY_CONDUCTED,
                MeetingStatus.ATTENDED_QUEUEING_CONDUCTED);

        for(int i = 0; i < observations.size(); i++){
            observations.get(i).setBackgroundColor(StringUtility.randomBackgroundColorString(i));
        }

        return new ScatterPlotDataset(
                observations
        );
    }
}
