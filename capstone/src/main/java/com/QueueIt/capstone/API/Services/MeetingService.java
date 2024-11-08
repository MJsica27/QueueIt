package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.Repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public ResponseEntity<Object> getMeetingCount(Long classID, Long groupID) {
        return ResponseEntity.ok(meetingRepository.countMeetingsByClassIdAndGroupId(classID,groupID));
    }
}
