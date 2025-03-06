package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.Entities.Attendance;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Repository.AttendanceRepository;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import com.QueueIt.capstone.API.Repository.QueueingEntryRepository;
import org.hibernate.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingService {

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

    public List<MeetingDTO> retrieveMeetingsForSummary(Long teamID){
        return meetingRepository.retrieveMeetingsForTeam(teamID);    }
}
