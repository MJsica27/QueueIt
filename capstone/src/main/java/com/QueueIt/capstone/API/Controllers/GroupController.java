package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Group;
import com.QueueIt.capstone.API.Services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/group")
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

}
