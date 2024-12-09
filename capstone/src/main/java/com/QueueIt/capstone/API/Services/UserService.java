package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.Config.JWTService;
import com.QueueIt.capstone.API.Entities.*;
//import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Repository.*;
import com.QueueIt.capstone.API.Requests.AvailabilityRequest;
import com.QueueIt.capstone.API.Requests.LoginRequest;
//import com.QueueIt.capstone.API.Repository.StudentRepository;

import com.QueueIt.capstone.API.Requests.StudentRegistrationRequest;
import com.QueueIt.capstone.API.Returns.AuthenticationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Time;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private QueueingGroupsRepository queueingGroupsRepository;

    //private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public ResponseEntity<Object> loginUser(LoginRequest loginRequest) {
        try{
            User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            return ResponseEntity.ok(new AuthenticationResponse(user, jwtService.generateToken(user)));
        }catch (Exception e){
            return ResponseEntity.status(404).body("Invalid username or password.");
        }
    }

    public Boolean createAdviserAccount(User user) {
        User my_user = userRepository.save(new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getFirstname(),
                user.getLastname(), user.getPhotoURL(), Role.ADVISER));
        Adviser adviser = adviserRepository.save(new Adviser(my_user));
        if (adviser != null) {
            queueingGroupsRepository.save(new QueueingGroups(adviser.getUser().getUserID()));
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    //for registration form
    public ResponseEntity<String> registerStudent(StudentRegistrationRequest studentRegistrationRequest) {
        User user = new User(
                studentRegistrationRequest.getUsername(),
                passwordEncoder.encode(studentRegistrationRequest.getPassword()),
                studentRegistrationRequest.getFirstname(),
                studentRegistrationRequest.getLastname(),
                null,
                Role.STUDENT
        );
        Student student = new Student(user);
        try{
            studentRepository.save(student);
        }catch (Exception e){
            return ResponseEntity.status(406).body("Invalid username or password");
        }
        return ResponseEntity.ok("Student registration successful.");
    }

    // for admin create account
    public ResponseEntity<String> registerUser(StudentRegistrationRequest studentRegistrationRequest) {
        Role role;
        try {
            role = Role.valueOf(studentRegistrationRequest.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Invalid role provided.");
        }


        User user = new User(
                studentRegistrationRequest.getUsername(),
                passwordEncoder.encode(studentRegistrationRequest.getPassword()),
                studentRegistrationRequest.getFirstname(),
                studentRegistrationRequest.getLastname(),
                null,
                role
        );

        try {
            switch (role) {
                case STUDENT:
                    Student student = new Student(user);
                    studentRepository.save(student);
                    break;
                case ADVISER:
                    Adviser adviser = new Adviser(user);
                    adviserRepository.save(adviser);
                    queueingGroupsRepository.save(new QueueingGroups(adviser.getUser().getUserID()));
                    break;
                case ADMIN:
                    Admin admin = new Admin(user);
                    adminRepository.save(admin);
                    break;
                default:
                    return ResponseEntity.status(400).body("Invalid role provided.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(406).body("An error occurred during registration.");
        }

        return ResponseEntity.ok(role.name() + " registration successful.");
    }


    public ResponseEntity<Object> getStudentByReferenceID(Long userID) {
        try{
            return ResponseEntity.ok(studentRepository.getReferenceById(userID));
        }catch (Exception e){
            return ResponseEntity.status(404).body("Student does not exist");
        }
    }

    public ResponseEntity<Object> getAdviserByReferenceID(Long userID) {
        try{
            return ResponseEntity.ok(adviserRepository.getReferenceById(userID));
        }catch (Exception e){
            return ResponseEntity.status(404).body("Adviser does not exist.");
        }
    }

    public ResponseEntity<Object> getAdminByReferenceID(Long userID) {
        try{
            return ResponseEntity.ok(adminRepository.getReferenceById(userID));
        }catch (Exception e){
            return ResponseEntity.status(404).body("Invalid admin credentials.");
        }
    }

    public Boolean modifyUserProfile(Long userID, String passedCurrentPassword, User userUpdateData) {
        Optional<User> existingUserOpt = userRepository.findById(userID);
        logger.info("Received password update request with passedCurrentPassword: " + passedCurrentPassword);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            logger.info("User found with ID: {}", userID);
            try {
            // User wants to update password
            String newPassword = userUpdateData.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
                logger.info("New password provided, checking current password...");

                if (passedCurrentPassword == null || passedCurrentPassword.isEmpty()) {
                    logger.warn("No current password provided for password update.");
                    //return false;
                }
                if (!passwordEncoder.matches(passedCurrentPassword, existingUser.getPassword())) {
                    logger.warn("Inputted password does not match with database.");
                    return false;
                }
                // Password length requirements
                if (newPassword.length() < 8) {
                    return false;
                }
                existingUser.setPassword(passwordEncoder.encode(newPassword));
            }
            } catch (Exception e) {
                logger.error("Error updating user profile", e);
                return false;
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
            String availableTime, List<String> expertise) {

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

    public Boolean setAdviserAvailability(Long userID, List<AvailabilityRequest.AvailabilitySlot> availableTime) {
        Optional<Adviser> adviserOpt = adviserRepository.findById(userID);
        if (adviserOpt.isPresent()) {
            Adviser adviser = adviserOpt.get();

            for (AvailabilityRequest.AvailabilitySlot slot : availableTime) {
                if (!slot.isValid()) {
                    throw new IllegalArgumentException("Each slot must have either a week or a date, not both.");
                }
            }

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonAvailability = objectMapper.writeValueAsString(availableTime);
                adviser.setAvailableTime(jsonAvailability);
                adviserRepository.save(adviser);
                return true;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return false;
            }
        }

        return false;
    }

    public ResponseEntity<Object> getUserDetails(Long userID) {
        try{
            User user = userRepository.findById(userID).orElseThrow();
            HashMap<String, String> userDeets = new HashMap<String,String>();
            userDeets.put("firstname",user.getFirstname());
            userDeets.put("lastname",user.getLastname());
            return ResponseEntity.ok(userDeets);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }
}
