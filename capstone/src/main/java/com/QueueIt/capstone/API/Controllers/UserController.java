package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Admin;
import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Misc.FileManager;
import com.QueueIt.capstone.API.Requests.*;
import com.QueueIt.capstone.API.Returns.AuthenticationResponse;
import com.QueueIt.capstone.API.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileManager fileManager;

    @PostMapping("/createAdviserAccount")
    public ResponseEntity<String> createAdviser(@RequestBody User user) {
        if (userService.createAdviserAccount(user)) {
            return ResponseEntity.ok("Adviser account created successfully.");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getStudent")
    public ResponseEntity<Object> getStudentByReferenceID(@RequestParam Long userID) {
        return userService.getStudentByReferenceID(userID);
    }

    @GetMapping("/getAdviser")
    public ResponseEntity<Object> getAdviserByReferenceID(@RequestParam Long userID) {
        return userService.getAdviserByReferenceID(userID);
    }

    @GetMapping("/getAdmin")
    public ResponseEntity<Object> getAdminByReferenceID(@RequestParam Long userID) {
        return userService.getAdminByReferenceID(userID);
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

    @PostMapping("/testUpload")
    public ResponseEntity<Object> testUploadImage(@RequestBody MultipartFile multipartFile){
        try{
            fileManager.saveProfilePhoto(multipartFile);
            return ResponseEntity.ok("Profile image uploaded.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/testDeleteUpload")
    public ResponseEntity<Object> testDeleteImage(@RequestBody DeleteImageRequest url){
        try{
            fileManager.deleteProfilePhoto(url.getUrl());
            return ResponseEntity.ok("Profile image deleted.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/setAdviserAvailability")
    public ResponseEntity<Boolean> setAdviserAvailability(
            @RequestParam Long userID,
            @RequestBody AvailabilityRequest availabilityRequest) {

        boolean isSet = userService.setAdviserAvailability(userID, availabilityRequest.getAvailableTime());

        if (isSet) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
        }
    }

}
