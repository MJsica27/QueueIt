package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Requests.LoginRequest;
import com.QueueIt.capstone.API.Requests.StudentRegistrationRequest;
import com.QueueIt.capstone.API.Returns.AuthenticationResponse;
import com.QueueIt.capstone.API.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }
    @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody StudentRegistrationRequest studentRegistrationRequest) {
        return userService.registerUser(studentRegistrationRequest);
    }
}
