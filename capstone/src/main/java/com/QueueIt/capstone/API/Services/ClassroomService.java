package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Requests.EnrollStudentRequest;
import com.QueueIt.capstone.API.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.EmptyStackException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClassroomService {
    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdviserRepository adviserRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Long createClassroom(Classroom classroomCreationRequest){
        //this condition secures that a classroom may only be created via an existing Adviser or Admin account.
        if (adviserRepository.findById(classroomCreationRequest.getAdviserID()).isPresent() || adminRepository.findById(classroomCreationRequest.getAdviserID()).isPresent()){
            Classroom classroom = classroomRepository.save(classroomCreationRequest);
            if (classroom != null ){
                return classroom.getClassID();
            }
        }
        return null;
    }



    public Boolean deleteClassroomAsAdmin(Long classID, Long userID) {
        try {
            if (adminRepository.findById(userID).isPresent()) {
                Classroom classroom = classroomRepository.getReferenceById(classID);
                if (classroom != null) {
                    classroomRepository.deleteById(classID);
                    return Boolean.TRUE;
                }
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }


    public Classroom getClassroomByReferenceID(Long classID){
        return classroomRepository.findById(classID).orElseThrow();
    }

    public Boolean updateClassroomByReferenceID(Classroom classroom){
        try{
            Classroom myclassroom = classroomRepository.findById(classroom.getClassID()).get();
            if (myclassroom != null){
                //if insufficient  rights, still reflects Not found for security purposes.
                if (classroom.getAdviserID() == myclassroom.getAdviserID()){
                    myclassroom.setSubjectCode(classroom.getSubjectCode());
                    myclassroom.setSubjectName(classroom.getSubjectName());
                    myclassroom.setSection(classroom.getSection());
                    classroomRepository.save(myclassroom);
                    return Boolean.TRUE;
                }
                return Boolean.FALSE;
            }
            return Boolean.FALSE;
        }catch (Exception e){
            return Boolean.FALSE;
        }
    }

    public Boolean deleteClassroomByReferenceID(Long classID, Long userID){
        try{
            Adviser adviser = adviserRepository.getReferenceById(userID);
            Classroom classroom = classroomRepository.getReferenceById(classID);
            //if classroom is owned by the requestor
            if (classroom.getAdviserID() == adviser.getUser().getUserID()){
                classroomRepository.deleteById(classID);
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e){
            return Boolean.FALSE;
        }
    }

    public ResponseEntity<Object> enrollStudent(EnrollStudentRequest enrollStudentRequest){
        try{
            Classroom classroom = classroomRepository.findByClassCode(enrollStudentRequest.getClassCode());
            Student student = studentRepository.findById(enrollStudentRequest.getUserID()).orElseThrow();
            //if student is already part of the classroom
            if (classroom.getStudents().contains(student)){
                return ResponseEntity.badRequest().body("You're already part of this classroom.");
            }
            classroom.getStudents().add(student);
            classroomRepository.save(classroom);
            return ResponseEntity.ok(classroom);
        } catch (Exception e){
            return ResponseEntity.status(404).body("Classroom does not exist.");
        }
    }

    public List<Student> getStudentsGivenClassroom(Long classID){
        Classroom classroom = classroomRepository.getReferenceById(classID);
        return classroom.getStudents();
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public List<Classroom> getClassrooms(Long userID) {
        try{
            User user = userRepository.findById(userID).orElseThrow();
            if (user.getRole().equals(Role.ADVISER)){
                List<Classroom> classrooms = classroomRepository.findByAdviserID(userID);
                if (classrooms.isEmpty()){
                    return null;
                }
                return classrooms;
            } else if (user.getRole().equals(Role.STUDENT)) {
                Student student = studentRepository.findById(userID).orElseThrow();
                List<Classroom> classrooms = classroomRepository.findByStudentsContaining(student);
                if (classrooms.isEmpty()){
                    return null;
                }
                return classrooms;
            }
        }catch (NoSuchElementException e){
            return null;
        }
        return null;
    }
}
