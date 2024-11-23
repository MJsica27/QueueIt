package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import com.QueueIt.capstone.API.Requests.ChatRequest;
import com.QueueIt.capstone.API.Returns.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class ChatService {

    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Void> sendMessage(ChatRequest chatRequest) {
        try{
            User user = userRepository.findById(chatRequest.getUserID()).orElseThrow();
            ChatResponse chatResponse = new ChatResponse(user.getUserID(),user.getFirstname(), user.getLastname(),user.getPhotoURL(),chatRequest.getMessage());
            simpMessageSendingOperations.convertAndSend("/topic/chat/adviser/"+chatRequest.getAdviserID(),chatResponse);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
        return null;
    }
}
