package com.QueueIt.capstone.API.Requests;

public class DeleteImageRequest {
    String url;

    public DeleteImageRequest() {
    }

    public DeleteImageRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
