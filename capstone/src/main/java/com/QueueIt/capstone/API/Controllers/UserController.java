package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Admin;
import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Requests.LoginRequest;
import com.QueueIt.capstone.API.Requests.ModifyAdviserProfileRequest;
import com.QueueIt.capstone.API.Requests.ModifyStudentProfileRequest;
import com.QueueIt.capstone.API.Requests.StudentRegistrationRequest;
import com.QueueIt.capstone.API.Returns.AuthenticationResponse;
import com.QueueIt.capstone.API.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createAdviserAccount")
    public ResponseEntity<String> createAdviser(@RequestBody User user) {
        if (userService.createAdviserAccount(user)) {
            return ResponseEntity.ok("Adviser account created successfully.");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getStudent")
    public ResponseEntity<Student> getStudentByReferenceID(@RequestParam Long userID) {
        Student student = userService.getStudentByReferenceID(userID);
        if (student != null) {
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAdviser")
    public ResponseEntity<Adviser> getAdviserByReferenceID(@RequestParam Long userID) {
        Adviser adviser = userService.getAdviserByReferenceID(userID);
        if (adviser != null) {
            return ResponseEntity.ok(adviser);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAdmin")
    public ResponseEntity<Admin> getAdminByReferenceID(@RequestParam Long userID) {
        Admin admin = userService.getAdminByReferenceID(userID);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.notFound().build();
    }


    @PutMapping("/modifyProfile")
    public ResponseEntity<Boolean> modifyUserProfile(
            @RequestParam Long userID,
            @RequestBody ModifyStudentProfileRequest userUpdateRequest) {

        String passedCurrentPassword = userUpdateRequest.getPassedCurrentPassword();
        User userUpdateData = userUpdateRequest.getUserUpdateData();
        
        boolean isUpdated = userService.modifyUserProfile(userID, passedCurrentPassword, userUpdateData);
    
        if (isUpdated) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false); // or any appropriate status
        }
    }


    @PostMapping("/modifyStudentAssignedClassroom")
    public ResponseEntity<Boolean> modifyStudentAssignedClassroom(
            @RequestParam Long studentID,
            @RequestParam Long currentClassId,
            @RequestParam Long newClassId) {

        Boolean result = userService.adminModifyStudentAssignedClassroom(studentID, currentClassId, newClassId);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/removeStudentFromClassroom")
    public ResponseEntity<Boolean> removeStudentFromClassroom(
            @RequestParam Long studentID,
            @RequestParam Long currentClassId) {

        Boolean result = userService.removeStudentFromClassroom(studentID, currentClassId);

        return ResponseEntity.ok(result);
    }

}
