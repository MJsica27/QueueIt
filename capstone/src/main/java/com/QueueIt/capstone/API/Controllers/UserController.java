package com.QueueIt.capstone.API.Controllers;


import com.QueueIt.capstone.API.Entities.Adviser;
import com.QueueIt.capstone.API.Entities.Student;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Miscellaneous.LoginRequest;
import com.QueueIt.capstone.API.Services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest loginRequest){
        User user = userService.loginUser(loginRequest);
        if (user != null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();

    }

    @PostMapping("createAdviserAccount")
    public ResponseEntity<String> createAdviser(@RequestBody User user){
        if (userService.createAdviserAccount(user)){
            return ResponseEntity.ok("Adviser account created successfully.");
        }
        return ResponseEntity.noContent().build();
    }

//    public ResponseEntity<String> registerUser(@RequestBody User user)

    @GetMapping("getStudent")
    public ResponseEntity<Student> getStudentByReferenceID(@RequestParam Long userID){
        Student student = userService.getStudentByReferenceID(userID);
        if (student != null){
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("getAdviser")
    public ResponseEntity<Adviser> getAdviserByReferenceID(@RequestParam Long userID){
        Adviser adviser = userService.getAdviserByReferenceID(userID);
        if (adviser != null){
            return ResponseEntity.ok(adviser);
        }
        return ResponseEntity.notFound().build();
    }
}
