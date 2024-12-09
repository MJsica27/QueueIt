package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Requests.EnrollStudentRequest;
import com.QueueIt.capstone.API.Services.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.EmptyStackException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/classroom")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @PostMapping("/create")
    public ResponseEntity<Object> createClassroom(@RequestBody Classroom classroom){
        Long id = classroomService.createClassroom(classroom);
        if (id != null){
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.status(406).body("Adviser account or Admin account is necessary for classroom creation.");
    }
    // admin get all classroom
    @GetMapping("/all")
    public List<Classroom> getAllClassrooms() {
        return classroomService.getAllClassrooms();
    }

    @GetMapping("/getClassroom")
    public ResponseEntity<Classroom> getClassroomByReferenceID(@RequestParam Long classID){
        try{
            return ResponseEntity.ok(classroomService.getClassroomByReferenceID(classID));
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    // admin deletion
    @PostMapping("/deleteClassroomAsAdmin")
    public ResponseEntity<String> deleteClassroomAsAdmin(@RequestParam Long classID, @RequestParam Long userID) {
        if (classroomService.deleteClassroomAsAdmin(classID, userID)) {
            return ResponseEntity.ok("Classroom successfully deleted by admin.");
        }
        return ResponseEntity.status(403).body("Deletion failed. Ensure that the user is an admin or the classroom does not exist.");
    }

    @PostMapping("/editClassroom")
    public ResponseEntity<String> updateClassroomByReferenceID(@RequestBody Classroom classroom){
        if (classroomService.updateClassroomByReferenceID(classroom)){
            return ResponseEntity.ok("Classroom changes saved.");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/deleteClassroom")
    public ResponseEntity<String> deleteClassroomByReferenceID(@RequestParam Long classID, @RequestParam Long userID){
        if (classroomService.deleteClassroomByReferenceID(classID, userID)){
            return ResponseEntity.ok("Classroom successfully deleted.");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/enroll")
    public ResponseEntity<Object> enrollStudent(@RequestBody EnrollStudentRequest enrollStudentRequest){
        return classroomService.enrollStudent(enrollStudentRequest);
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<Student>> getStudentsGivenClassroom(@RequestParam Long classID){
        return ResponseEntity.ok(classroomService.getStudentsGivenClassroom(classID));
    }

    @GetMapping("/getClassrooms")
    public ResponseEntity<Object> getClassrooms(@RequestParam Long userID){
        List<Classroom> classrooms = classroomService.getClassrooms(userID);
        if (classrooms == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(classrooms);
    }

}
