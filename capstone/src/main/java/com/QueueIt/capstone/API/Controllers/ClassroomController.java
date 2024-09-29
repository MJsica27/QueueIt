package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Miscellaneous.EnrollStudentRequest;
import com.QueueIt.capstone.API.Services.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @PostMapping("/create")
    public ResponseEntity<Long> createClassroom(@RequestBody Classroom classroom){
        return ResponseEntity.ok(classroomService.createClassroom(classroom));

    }

    @GetMapping("/getClassroom")
    public ResponseEntity<Classroom> getClassroomByReferenceID(@RequestParam Long classID){
        return ResponseEntity.ok(classroomService.getClassroomByReferenceID(classID));
    }

    @PostMapping("/editClassroom")
    public ResponseEntity<String> updateClassroomByReferenceID(@RequestBody Classroom classroom){
        if (classroomService.updateClassroomByReferenceID(classroom)){
            return ResponseEntity.ok("Classroom changes saved.");
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/deleteClassroom")
    public ResponseEntity<String> deleteClassroomByReferenceID(@RequestParam Long classID, @RequestParam Long userID){
        if (classroomService.deleteClassroomByReferenceID(classID, userID)){
            return ResponseEntity.ok("Classroom successfully deleted.");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(EnrollStudentRequest enrollStudentRequest){
        if (classroomService.enrollStudent(enrollStudentRequest)){
            return ResponseEntity.ok("Student successfully enrolled.");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/myClassrooms")
    public ResponseEntity<List<Classroom>> viewUserClassrooms(@RequestParam Long userID){
        return ResponseEntity.ok(classroomService.viewUserClassrooms(userID));
    }

    @GetMapping("/getStudents")
    public ResponseEntity<List<Student>> getStudentsGivenClassroom(@RequestParam Long classID){
        return ResponseEntity.ok(classroomService.getStudentsGivenClassroom(classID));
    }

}
