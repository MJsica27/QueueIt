package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Admin;
import com.QueueIt.capstone.API.Entities.Adviser;
//import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Miscellaneous.LoginRequest;
import com.QueueIt.capstone.API.Repository.AdminRepository;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
//import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
import com.QueueIt.capstone.API.Return.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    public Boolean createAdviserAccount(User user){
        User my_user = userRepository.save(new User(user.getUsername(),user.getPassword(),user.getFirstname(),user.getLastname(),user.getPhotoURL()));
        Adviser adviser = adviserRepository.save(new Adviser(my_user));
        if (adviser != null){
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean registerUser(User user){
        Student student = studentRepository.save(new Student(user));
        if (student != null){
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Student getStudentByReferenceID(Long userID){
        return studentRepository.getReferenceById(userID);
    }

    public Adviser getAdviserByReferenceID(Long userID){
        return adviserRepository.getReferenceById(userID);
    }

    public Admin getAdminByReferenceID(Long userID) { return adminRepository.getReferenceById(userID); }
}
