package com.QueueIt.capstone.API.DTO;

import java.util.List;

public class DataEntryv2 {
    private List<Double> data;
    private List<String> backgroundColor;

    public DataEntryv2() {
    }

    public DataEntryv2(List<Double> data, List<String> backgroundColor) {
        this.data = data;
        this.backgroundColor = backgroundColor;
    }

    public List<Double> getData() {
        return data;
    }

    public void setData(List<Double> data) {
        this.data = data;
    }

    public List<String> getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(List<String> backgroundColor) {
        this.backgroundColor = backgroundColor;
    }
}
