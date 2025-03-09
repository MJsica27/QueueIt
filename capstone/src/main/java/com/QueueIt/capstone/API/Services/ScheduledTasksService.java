package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.MeetingDTO;
import com.QueueIt.capstone.API.Entities.Attendance;
import com.QueueIt.capstone.API.Entities.Meeting;
import com.QueueIt.capstone.API.Entities.Team;
import com.QueueIt.capstone.API.Enums.AttendanceStatus;
import com.QueueIt.capstone.API.Enums.MeetingStatus;
import com.QueueIt.capstone.API.Middlewares.QueueingManagerNotFoundException;
import com.QueueIt.capstone.API.Repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduledTasksService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private APIService apiService;

    @Autowired
    private MeetingService meetingService;

    @Scheduled(cron = "0 0,30 8-17 * * 1-5")
    public void manageMeetings(){
        LocalDateTime fiveMinuteOffsetFromNow = LocalDateTime.now().minusMinutes(5);
        LocalDateTime now = LocalDateTime.now();
        //[1] retrieves the meetings that were created via automation @midnight of this day
        //that is supposed to start at n:00 or n:30 or 5 minutes before that.
        // e.g: 7:55 - 8:00 or 8:25 - 8:30 ... 4:25 : 4:30
        // that has a meeting status of SET_AUTOMATICALLY

        startMeetings(fiveMinuteOffsetFromNow, now);

        defaultMeetings(fiveMinuteOffsetFromNow, now);

    }

    //runs every midnight every weekday
    //creates meetings for each week day
    @Scheduled(cron = "0 0 0 * * 1-5")
    public void createScheduledMeetingsForToday(){
        //WebClient is supposed to do subscribe, according to blackbox.
        apiService.fetchTeamsForAutomationTodayFromSpear()
                .subscribe(teams -> {
                    if (teams != null && !teams.isEmpty()){
                        teams.stream()
                                .forEach(team -> {

                                    //in here, I reused meeting service on creating meeting appointments
                                    //thus creating a new MeetingDTO and passing MeetingStatus.SET_AUTOMATED

                                    List<Attendance> attendanceList = new ArrayList<>();

                                    for (int i =0; i<team.getMemberIds().size(); i++){
                                        String[] fullname = team.getMemberNames().get(i).split(" ");
                                        String firstname = fullname[0];
                                        String lastname = fullname[1];
                                        Attendance attendance = new Attendance(
                                                firstname+"."+lastname+"@cit.edu",
                                                firstname,
                                                lastname,
                                                AttendanceStatus.PRESENT
                                        );

                                        attendanceList.add(attendance);
                                    }

                                    //Spear stored their time as LocalTime, and start and end in queueit is LocalDatetime
                                    //Since the WebClient retrieves teams for today each weekday, so we know that today is a weekday
                                    //So I just combined today's day and the LocalTime of start and end provided by spear
                                    LocalDateTime startTime = LocalDateTime.of(LocalDate.now(), team.getStart());
                                    LocalDateTime endTime = LocalDateTime.of(LocalDate.now(), team.getEnd());


                                    MeetingDTO meetingDTO = new MeetingDTO(
                                            startTime,
                                            endTime,
                                            attendanceList,
                                            team.getAdviserID(),
                                            team.getTid(),
                                            team.getGroupName()
                                    );

                                    try{
                                        Meeting meeting = meetingService.createMeetingAppointment(meetingDTO, MeetingStatus.SET_AUTOMATED);
                                    }catch (QueueingManagerNotFoundException e){
                                        System.out.println("Queueing Manager was not found. Could not create automated meeting.");
                                    }
                                });
                    }
                }, error ->{
                   System.err.println("Error fetching teams: "+error.getMessage());
                });
    }


    //all the meetings that were created prior to this method has a status of SET_AUTOMATED
    //meaning igo ra sha na create, wala pa sha masugdi
    //so ato sha sugdan automatically via this scheduled method or STARTED_AUTOMATED.
    //nya if kinsay una maka sulod sa meeting, ang status ilisan.
    //e.g a team member naka sud una sa meeting, meetingStatus = MeetingStatus.STARTED_TEAM_INITIATED,
    // if faculty maka una then meetingStatus = STARTED_FACULTY_INITIATED,
    public void startMeetings(LocalDateTime fiveMinuteOffsetFromNow, LocalDateTime now){
        List<Meeting> retrievedMeetings = meetingRepository.retrieveAutomatedMeetingsToStart(fiveMinuteOffsetFromNow,now, MeetingStatus.SET_AUTOMATED);
        retrievedMeetings.stream()
                .forEach(meeting -> {
                    meeting.setMeetingStatus(MeetingStatus.STARTED_AUTOMATED);
                });

        meetingRepository.saveAll(retrievedMeetings);
    }


    //if ang method prio ani, naabot nalang sa end time niya, nya iyang satatus STARTED_AUTOMATED gihapon
    //meaning way nitunga sa either sides, team ug faculty.
    //so set nato siya as Defaulted
    public void defaultMeetings(LocalDateTime fiveMinuteOffsetFromNow, LocalDateTime now){
        List<Meeting> retrievedMeetings = meetingRepository.retrieveAutomatedMeetingsToStart(fiveMinuteOffsetFromNow,now, MeetingStatus.STARTED_AUTOMATED);
        retrievedMeetings.stream()
                .forEach(meeting -> {
                    meeting.setMeetingStatus(MeetingStatus.FAILED_DEFAULTED);
                });

        meetingRepository.saveAll(retrievedMeetings);
    }
}
