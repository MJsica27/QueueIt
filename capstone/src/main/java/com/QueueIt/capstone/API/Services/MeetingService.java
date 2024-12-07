package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

//    public ResponseEntity<Object> getMeetingCount(Long classID, Long groupID) {
//        return ResponseEntity.ok(meetingRepository.countMeetingsByClassIdAndGroupId(classID,groupID));
//    }

    public Meeting getActiveMeeting(Long groupID){
        try{
            return meetingRepository.getActiveMeeting(groupID).orElseThrow();
        }catch (NoSuchElementException e){
            return null;
        }
    }
}
