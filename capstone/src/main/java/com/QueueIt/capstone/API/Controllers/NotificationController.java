package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userID}")
    public ResponseEntity<Object> retrieveUserNotifications(@PathVariable Long userID){
        return ResponseEntity.ok(notificationService.retrieveUserNotifications(userID));
    }
}
