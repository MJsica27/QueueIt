package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Admin;
import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Classroom;
//import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Miscellaneous.LoginRequest;
import com.QueueIt.capstone.API.Repository.AdminRepository;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.ClassroomRepository;
//import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import com.QueueIt.capstone.API.Return.AuthenticatedUser;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdviserRepository adviserRepository;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ClassroomRepository classroomRepository;

    public AuthenticatedUser loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        try {
            if (user.getPassword().equals(loginRequest.getPassword())) {
                Optional<Student> student = studentRepository.findById(user.getUserID());
                Optional<Adviser> adviser = adviserRepository.findById(user.getUserID()); // Correct repository

                if (student.isPresent()) {
                    return new AuthenticatedUser(user, 2); // Student role
                } else if (adviser.isPresent()) {
                    return new AuthenticatedUser(user, 1); // Adviser role
                } else {
                    return new AuthenticatedUser(user, 0); // Admin or other role
                }
            }
        } catch (NullPointerException e) {
            return null;
        }
        return null;
    }

    public Boolean createAdviserAccount(User user) {
        User my_user = userRepository.save(new User(user.getUsername(), user.getPassword(), user.getFirstname(),
                user.getLastname(), user.getPhotoURL()));
        Adviser adviser = adviserRepository.save(new Adviser(my_user));
        if (adviser != null) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean registerUser(User user) {
        Student student = studentRepository.save(new Student(user));
        if (student != null) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Student getStudentByReferenceID(Long userID) {
        return studentRepository.getReferenceById(userID);
    }

    public Adviser getAdviserByReferenceID(Long userID) {
        return adviserRepository.getReferenceById(userID);
    }

    public Admin getAdminByReferenceID(Long userID) {
        return adminRepository.getReferenceById(userID);
    }

    public Boolean modifyUserProfile(Long userID, String passedCurrentPassword, User userUpdateData) {
        Optional<User> existingUserOpt = userRepository.findById(userID);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (passedCurrentPassword != null && !passedCurrentPassword.isEmpty()) {
                if (!existingUser.getPassword().equals(passedCurrentPassword)) {
                    throw new IllegalArgumentException("Current password is incorrect.");
                }
            }

            String newPassword = userUpdateData.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
                if (newPassword.length() >= 8) {
                    existingUser.setPassword(newPassword);
                } else {
                    throw new IllegalArgumentException("New password must be at least 8 characters long.");
                }
            }

            existingUser.setFirstname(userUpdateData.getFirstname());
            existingUser.setLastname(userUpdateData.getLastname());
            existingUser.setPhotoURL(userUpdateData.getPhotoURL());

            userRepository.save(existingUser);
            return true;
        }
        return false;
    }

    public Boolean modifyAdviserProfile(Long userID, String currentPassword, User userUpdateData,
            List<Time> availableTime, List<String> expertise) {

        if (modifyUserProfile(userID, currentPassword, userUpdateData)) {
            Optional<Adviser> adviserOpt = adviserRepository.findById(userID);
            if (adviserOpt.isPresent()) {
                Adviser adviser = adviserOpt.get();
                adviser.setAvailableTime(availableTime);
                adviser.setExpertise(expertise);
                adviserRepository.save(adviser);
                return true;
            }
        }
        return false;
    }

    @Transactional
    public Boolean adminModifyStudentAssignedClassroom(Long studentID, Long currentClassId, Long newClassId) {
        Optional<Student> studentOptional = studentRepository.findById(studentID);
        Optional<Classroom> currentClassOptional = classroomRepository.findById(currentClassId);
        Optional<Classroom> newClassOptional = classroomRepository.findById(newClassId);

        if (!studentOptional.isPresent() || !currentClassOptional.isPresent() || !newClassOptional.isPresent()) {
            return false;
        }

        Student student = studentOptional.get();
        Classroom currentClass = currentClassOptional.get();
        Classroom newClass = newClassOptional.get();

        if (!student.getClassrooms().contains(currentClass)) {
            return false;
        }

        student.getClassrooms().remove(currentClass);
        student.getClassrooms().add(newClass);

        studentRepository.save(student);
        classroomRepository.save(currentClass);
        classroomRepository.save(newClass);
        return true;
    }

    public Boolean removeStudentFromClassroom(Long studentID, Long currentClassId) {
        Optional<Student> studentOptional = studentRepository.findById(studentID);
        Optional<Classroom> currentClassOptional = classroomRepository.findById(currentClassId);

        if (!studentOptional.isPresent() || !currentClassOptional.isPresent()) {
            return false;
        }

        Student student = studentOptional.get();
        Classroom currentClass = currentClassOptional.get();

        if (!student.getClassrooms().contains(currentClass)) {
            return false;
        }

        student.getClassrooms().remove(currentClass);
        studentRepository.save(student);
        classroomRepository.save(currentClass);

        return true;
    }

}
