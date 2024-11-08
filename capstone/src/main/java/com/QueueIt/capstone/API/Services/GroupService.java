package com.QueueIt.capstone.API.Services;


import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Group;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Repository.ClassroomRepository;
import com.QueueIt.capstone.API.Repository.GroupRepository;
import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserRepository userRepository;

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

    public ResponseEntity<Object> getGroupGivenClassroomStudent(Long classID, Long userID) {
        try{
            List<Group> groups = groupRepository.findByClassID(classID);
            User student = userRepository.findById(userID).orElseThrow();
            if (groups.isEmpty()){
                return ResponseEntity.notFound().build();
            }else{
                for (Group group: groups){
                    if (group.getStudents().contains(student)){
                        return ResponseEntity.ok(group);
                    }
                }
                return ResponseEntity.status(404).body("No group found for student.");
            }
        }catch (NoSuchElementException e){
            return ResponseEntity.status(406).body("Either classroom or student does not exist.");
        }catch (Exception e){
            return ResponseEntity.status(500).body("Something went wrong.");
        }
    }

    public ResponseEntity<Object> addStudentToGroup(Long studentID, Long groupID) {
        try{
            Group group = groupRepository.findById(groupID).orElseThrow();
            User student = userRepository.findById(studentID).orElseThrow();
            group.getStudents().add(student);
            groupRepository.save(group);
            return ResponseEntity.ok("Student added to group.");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Group or student does not exist.");
        }
    }

    public ResponseEntity<Object> assignMentor(Long groupID, Long adviserID) {
        try{
            Group group = groupRepository.findById(groupID).orElseThrow();
            group.setMentorID(adviserID);
            groupRepository.save(group);
            return ResponseEntity.ok("Mentor assigned.");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(404).body("Group does not exist.");
        }
    }
}
