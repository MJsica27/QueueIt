package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.*;
import com.QueueIt.capstone.API.Requests.EnrollStudentRequest;
import com.QueueIt.capstone.API.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.EmptyStackException;
import java.util.List;

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

    public Boolean enrollStudent(EnrollStudentRequest enrollStudentRequest){
        try{
            Classroom classroom = classroomRepository.findById(enrollStudentRequest.getClassID()).get();
            Student student = studentRepository.getReferenceById(enrollStudentRequest.getUserID());
            if (!classroom.getStudents().contains(student)){
                classroom.getStudents().add(student);
                classroomRepository.save(classroom);
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e){
            System.out.println(e);
            return Boolean.FALSE;
        }
    }

    public List<Classroom> viewUserClassrooms(Long userID){
        List<Classroom> classrooms = classroomRepository.findByAdviserID(userID);
        if (!classrooms.isEmpty()){
            return classrooms;
        }
        throw new EmptyStackException();
    }

    public List<Student> getStudentsGivenClassroom(Long classID){
        Classroom classroom = classroomRepository.getReferenceById(classID);
        return classroom.getStudents();
    }
}
