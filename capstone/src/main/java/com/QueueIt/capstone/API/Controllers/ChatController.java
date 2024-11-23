package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Requests.ChatRequest;
import com.QueueIt.capstone.API.Services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("")
    public ResponseEntity<Void> sendMessage(@RequestBody ChatRequest chatRequest){
        return chatService.sendMessage(chatRequest);
    }
}
