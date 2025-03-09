package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.DTO.QueueingEntryDTO;
import com.QueueIt.capstone.API.DTO.ReportSummaryDTOs.ReportSummary;
import com.QueueIt.capstone.API.DTO.ReportSummaryDTOs.ReportSummaryEntry;
import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Repository.AttendanceRepository;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import com.QueueIt.capstone.API.Repository.QueueingEntryRepository;
import com.QueueIt.capstone.API.Repository.QueueingManagerRepository;
import com.QueueIt.capstone.API.Utilities.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
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

    @Autowired
    private QueueingManagerRepository queueingManagerRepository;

    @Autowired
    private QueueingService queueingService;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private QueueingEntryRepository queueingEntryRepository;


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
        List<Meeting> meetings = meetingRepository.retrieveAllMeetingsForSummary(teamID, MeetingStatus.ATTENDED_QUEUEING_CONDUCTED, MeetingStatus.ATTENDED_FACULTY_CONDUCTED);

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

                                // Round to one decimal place using BigDecimal
                                BigDecimal bd = new BigDecimal(gradeAverage);
                                bd = bd.setScale(1, RoundingMode.HALF_UP); // Rounds to the nearest tenth
                                Float roundedAverage = bd.floatValue(); // Convert back to float if needed

                                // Create the report summary entry
                                ReportSummaryEntry reportSummaryEntry = new ReportSummaryEntry(
                                        counter.get(),
                                        meeting.getStart(),
                                        roundedAverage,
                                        attendance.getFirstname() + ", " + attendance.getLastname()
                                );

                                reportSummary.getReportSummaryEntryList().add(reportSummaryEntry);
                            });
                    counter.getAndAdd(1);
                });

        return reportSummary;
    }

    public Meeting createMeetingAppointment(MeetingDTO meetingDTO, MeetingStatus meetingStatus) throws QueueingManagerNotFoundException {
        QueueingManager queueingManager = null;
        try{
            queueingManager = queueingManagerRepository
                    .findByFacultyID(meetingDTO.getMentorID())
                    .orElseThrow(()-> new QueueingManagerNotFoundException("Queueing manager for faculty not found."));
        }catch (QueueingManagerNotFoundException e){
            queueingManager = facultyService.createQueueingManager(meetingDTO.getMentorID());
        }

        if (queueingManager == null){
            throw new QueueingManagerNotFoundException("Queueing manager for faculty not found.");
        }

        QueueingEntryDTO queueingEntryDTO = new QueueingEntryDTO();
        queueingEntryDTO.setFacultyID(meetingDTO.getMentorID());
        queueingEntryDTO.setTeamID(meetingDTO.getTeamID());
        queueingEntryDTO.setAttendanceList(meetingDTO.getAttendanceList());
        queueingEntryDTO.setClassReference(meetingDTO.getTeamID().toString());
        queueingEntryDTO.setTeamName(meetingDTO.getTeamName());

        QueueingEntry queueingEntry = queueingService.createQueueingEntry(queueingEntryDTO, queueingManager);
        return meetingRepository.save(new Meeting(
                meetingDTO.getStart(),
                meetingDTO.getEnd(),
                meetingStatus,
                queueingEntry,
                queueingManager
        ));
    }

    public List<MeetingDTO> retrieveAppointmentsForFaculty(Long facultyID) {
        LocalDateTime now = LocalDateTime.now();
        List<Meeting> meetings = meetingRepository.retrieveAppointmentsForFaculty(facultyID, now, MeetingStatus.SET_MANUALLY);
        List<MeetingDTO> events = new ArrayList<>();

        meetings.stream()
                .forEach(meeting -> {
                    MeetingDTO foo = new MeetingDTO(
                            meeting.getMeetingID(),
                            meeting.getStart(),
                            meeting.getEnd(),
                            meeting.getQueueingEntry().getTeamName(),
                            meeting.getMeetingStatus()
                    );
                    events.add(foo);
                });

        return events;
    }

    public void cancelMeetingAppointment(Long meetingID){
        Meeting meeting = meetingRepository.findById(meetingID)
                .orElseThrow(()-> new RuntimeException("Meeting not found"));

        queueingEntryRepository.delete(meeting.getQueueingEntry());
        meeting.setQueueingEntry(null);
        meeting.setMeetingStatus(MeetingStatus.CANCELLED);
        meetingRepository.save(meeting);
    }
}
