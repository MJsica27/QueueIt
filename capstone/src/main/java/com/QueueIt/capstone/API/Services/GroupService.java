package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Group;
import com.QueueIt.capstone.API.Repository.ClassroomRepository;
import com.QueueIt.capstone.API.Repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    public ResponseEntity<Object> getGroupsGivenClassroom(Long classroomID) {
        try{
            Classroom classroom = classroomRepository.findById(classroomID).orElseThrow();
            List<Group> groups = groupRepository.findByClassID(classroomID);
            if (groups.isEmpty()){
                return ResponseEntity.status(204).body("No groups for this classroom yet.");
            }else{
                return ResponseEntity.ok(groups);
            }
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Classroom does not exist.");
        }

    }

    public ResponseEntity<Object> createGroup(Group group) {
        groupRepository.save(group);
        return ResponseEntity.ok("Group created.");
    }

    public ResponseEntity<Object> deleteGroup(Long groupID){
        try{
            Group group = groupRepository.findById(groupID).orElseThrow();
            groupRepository.delete(group);
            return ResponseEntity.ok("Group Deleted.");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Group does not exist.");
        }
    }
}
