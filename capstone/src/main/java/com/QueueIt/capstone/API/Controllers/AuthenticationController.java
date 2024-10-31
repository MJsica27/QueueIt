package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Requests.LoginRequest;
import com.QueueIt.capstone.API.Requests.StudentRegistrationRequest;
import com.QueueIt.capstone.API.Returns.AuthenticationResponse;
import com.QueueIt.capstone.API.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }
    // for admin create account
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody StudentRegistrationRequest studentRegistrationRequest) {
        return userService.registerUser(studentRegistrationRequest);
    }

    //for registrationform.jsx
    @PostMapping("/registerStudent")
    public ResponseEntity<String> registerStudent(@RequestBody StudentRegistrationRequest studentRegistrationRequest) {
        return userService.registerStudent(studentRegistrationRequest);
    }
}
