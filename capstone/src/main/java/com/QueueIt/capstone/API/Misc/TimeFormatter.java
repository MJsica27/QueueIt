package com.QueueIt.capstone.API.Misc;

import org.springframework.stereotype.Component;

import java.sql.Time;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimeFormatter {

    public TimeFormatter() {
    }

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    public Time parseStringToTimeHoursAndMinutesInputOnly(String timeString){
        LocalTime localTime = LocalTime.parse(timeString,formatter);

        return Time.valueOf(localTime);
    }

    public DateTimeFormatter getFormatter() {
        return formatter;
    }
}
