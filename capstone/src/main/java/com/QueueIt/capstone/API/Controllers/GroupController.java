package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Group;
import com.QueueIt.capstone.API.Services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/group")
@CrossOrigin
public class GroupController {

    @Autowired
    public GroupService groupService;

    @GetMapping("/getAllGivenClassroom")
    public ResponseEntity<Object> getGroupsGivenClassroom(@RequestParam Long classroomID){
        return groupService.getGroupsGivenClassroom(classroomID);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createGroup(@RequestBody Group group){
        return groupService.createGroup(group);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteGroup(@RequestParam Long groupID){
        return groupService.deleteGroup(groupID);
    }

    @GetMapping("/getGroupGivenStudent")
    public ResponseEntity<Object> getGroupGivenClassroomStudent(@RequestParam Long classID, Long userID){
        return groupService.getGroupGivenClassroomStudent(classID,userID);
    }

    @PostMapping("/addStudentToGroup")
    public ResponseEntity<Object> addStudentToGroup(@RequestParam Long studentID, @RequestParam Long groupID){
        return groupService.addStudentToGroup(studentID,groupID);
    }

    @PostMapping("/assignMentor")
    public ResponseEntity<Object> assignMentor(@RequestParam Long groupID, @RequestParam Long adviserID){
        return groupService.assignMentor(groupID, adviserID);
    }

}
