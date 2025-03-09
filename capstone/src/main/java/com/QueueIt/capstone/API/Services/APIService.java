package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Team;
import com.QueueIt.capstone.API.Enums.DayOfWeek;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class APIService {

    private WebClient webClient;

    public APIService(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
    }

    public Mono<List<Team>> fetchTeamsForAutomationTodayFromSpear(){
        LocalDateTime now = LocalDateTime.now();
        if (!(now.getDayOfWeek().toString().equals("SUNDAY") || now.getDayOfWeek().toString().equals("SATURDAY"))){
            DayOfWeek day = DayOfWeek.valueOf(now.getDayOfWeek().toString());

            return webClient.get()
                    .uri("/team/automateScheduledMeetings/"+day)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Team>>() {
                    })
                    .onErrorResume(e -> {
                       return Mono.empty();
                    });
        }

        return Mono.empty();
    }

}
