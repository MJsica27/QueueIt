package com.QueueIt.capstone.API.Requests;
import java.util.List;


public class AvailabilityRequest {
    private List<AvailabilitySlot> availableTime;

    public List<AvailabilitySlot> getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(List<AvailabilitySlot> availableTime) {
        this.availableTime = availableTime;
    }

    @Override
    public String toString() {
        return "AvailabilityRequest{" +
                "availableTime=" + availableTime +
                '}';
    }

    public static class AvailabilitySlot {
        private String week;
        private String date;
        private String start;
        private String end;

        public String getWeek() {
            return week;
        }

        public void setWeek(String week) {
            this.week = week;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getStart() {
            return start;
        }

        public void setStart(String start) {
            this.start = start;
        }

        public String getEnd() {
            return end;
        }

        public void setEnd(String end) {
            this.end = end;
        }
        // Ensure either week or date is populated, not both
        public boolean isValid() {
            return (week != null && date == null) || (week == null && date != null) || (week == null && date == null);
        }
    }
}