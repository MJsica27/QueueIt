package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Miscellaneous.EnrollStudentRequest;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.ClassroomRepository;
import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Long createClassroom(Classroom classroomCreationRequest){
        Classroom classroom = classroomRepository.save(classroomCreationRequest);
        if (classroom != null){
            return classroom.getClassID();
        }
        return null;
    }

    public Classroom getClassroomByReferenceID(Long classID){
        return classroomRepository.getReferenceById(classID);
    }

    public Boolean updateClassroomByReferenceID(Classroom classroom){
        Classroom myclassroom = classroomRepository.getReferenceById(classroom.getClassID());
        if (myclassroom != null){
            myclassroom.setSubjectCode(classroom.getSubjectCode());
            myclassroom.setSubjectName(classroom.getSubjectName());
            classroomRepository.save(myclassroom);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean deleteClassroomByReferenceID(Long classID, Long userID){
        try{
            Adviser adviser = adviserRepository.getReferenceById(userID);
            Classroom classroom = classroomRepository.getReferenceById(classID);
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
            Classroom classroom = classroomRepository.getReferenceById(enrollStudentRequest.getClassID());
            Student student = studentRepository.getReferenceById(enrollStudentRequest.getUserID());
            classroom.getStudents().add(student);
            classroomRepository.save(classroom);
            return Boolean.TRUE;
        } catch (Exception e){
            return Boolean.FALSE;
        }
    }

    public List<Classroom> viewUserClassrooms(Long userID){
        return classroomRepository.findByAdviserID(userID);
    }

    public List<Student> getStudentsGivenClassroom(Long classID){
        Classroom classroom = classroomRepository.getReferenceById(classID);
        return classroom.getStudents();
    }
}
