package com.QueueIt.capstone.API.Entities;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingID;
    private Long adviserID;
    private Long groupID;
    private Time start;
    private Time end;
    private Date meetingDate;
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<Attendance> attendance;
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<Grade> grades;
    @OneToOne(mappedBy = "meeting")
    private DefaultedMeetingLog defaultedMeetingLog;

    public Meeting() {
    }

    public Meeting(Long adviserID, Long groupID) {
        this.adviserID = adviserID;
        this.groupID = groupID;
    }

    public Long getMeetingID() {
        return meetingID;
    }

    public void setMeetingID(Long meetingID) {
        this.meetingID = meetingID;
    }

    public Long getAdviserID() {
        return adviserID;
    }

    public void setAdviserID(Long adviserID) {
        this.adviserID = adviserID;
    }

    public Long getGroupID() {
        return groupID;
    }

    public void setGroupID(Long groupID) {
        this.groupID = groupID;
    }

    public Time getStart() {
        return start;
    }

    public void setStart(Time start) {
        this.start = start;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }

    public Time calculateDifference(){
        LocalTime endTime = this.end.toLocalTime();
        LocalTime startTime = this.start.toLocalTime();
        Duration duration = Duration.between(startTime,endTime);
        LocalTime localTime = LocalTime.MIDNIGHT.plus(duration);
        return Time.valueOf(localTime);
    }
}
