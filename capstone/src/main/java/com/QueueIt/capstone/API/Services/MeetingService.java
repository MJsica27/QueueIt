package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.DTO.ReportSummaryDTOs.ReportSummary;
import com.QueueIt.capstone.API.DTO.ReportSummaryDTOs.ReportSummaryEntry;
import com.QueueIt.capstone.API.Entities.Grade;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Repository.AttendanceRepository;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import com.QueueIt.capstone.API.Utilities.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private static final Logger log = LoggerFactory.getLogger(MeetingService.class);
    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;


    public List<MeetingDTO> retrieveMeetingsForMeetingBoard(Long teamID){
        List<MeetingDTO> meetingList = meetingRepository.retrieveMeetingsForTeam(teamID);
        List<MeetingDTO> meetingDTOList = new ArrayList<>();

        meetingList.stream()
                        .forEach(meetingDTO -> {
                            meetingDTOList.add(
                                    new MeetingDTO(
                                            meetingDTO.getNotedAssignedTasks(),
                                            meetingDTO.getImpedimentsEncountered(),
                                            meetingDTO.getStart(),
                                            meetingDTO.getEnd(),
                                            meetingDTO.getQueueingEntry().getAttendanceList(),
                                            meetingDTO.getMeetingStatus()
                                    )
                            );
                        });

        meetingDTOList.stream()
                .sorted(Comparator.comparing(MeetingDTO::getStart))
                .toList();

        return meetingDTOList;
    }

    public ReportSummary generateSummaryReport(Long teamID) {
        List<Meeting> meetings = meetingRepository.retrieveAllMeetingsForSummary(teamID);

        ReportSummary reportSummary = new ReportSummary();
        AtomicInteger counter = new AtomicInteger(1);

        meetings.stream()
                .sorted(Comparator.comparing(Meeting::getStart))
                .forEach(meeting -> {
                    meeting.getQueueingEntry().getAttendanceList().stream()
                            .forEach(attendance -> {
                                // Filter grades based on the student's name
                                List<Grade> studentGrades = meeting.getGrades().stream()
                                        .filter(grade -> grade.getStudentName().equals(
                                                StringUtility.capitalizeFirstLetter(attendance.getFirstname()) + " " +
                                                        StringUtility.capitalizeFirstLetter(attendance.getLastname())))
                                        .collect(Collectors.toList());

                                // Calculate the sum of grades
                                Float sum = studentGrades.stream()
                                        .map(Grade::getMark)
                                        .reduce(0.0f, Float::sum);

                                // Calculate the average, checking for division by zero
                                Float gradeAverage = studentGrades.isEmpty() ? 0.0f : sum / studentGrades.size();

                                // Create the report summary entry
                                ReportSummaryEntry reportSummaryEntry = new ReportSummaryEntry(
                                        counter.get(),
                                        meeting.getStart(),
                                        gradeAverage,
                                        attendance.getFirstname() + " " + attendance.getLastname()
                                );

                                reportSummary.getReportSummaryEntryList().add(reportSummaryEntry);
                            });
                    counter.getAndAdd(1);
                });

        return reportSummary;
    }
}
