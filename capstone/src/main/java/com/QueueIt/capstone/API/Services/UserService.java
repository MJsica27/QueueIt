package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Miscellaneous.LoginRequest;
import com.QueueIt.capstone.API.Repository.AdviserRepository;
import com.QueueIt.capstone.API.Repository.StudentRepository;
import com.QueueIt.capstone.API.Repository.UserRepository;
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

    public User loginUser(LoginRequest loginRequest){
        User user = userRepository.findByUsername(loginRequest.getUsername());
        try{
            if (user.getPassword().equals(loginRequest.getPassword())){
                return user;
            }
        } catch(NullPointerException e){
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

//    public Boolean registerUser(User user)

    public Student getStudentByReferenceID(Long userID){
        return studentRepository.getReferenceById(userID);
    }

    public Adviser getAdviserByReferenceID(Long userID){
        return adviserRepository.getReferenceById(userID);
    }
}
