package com.QueueIt.capstone.API.Misc;

import com.QueueIt.capstone.API.Config.JWTService;
import com.QueueIt.capstone.API.Entities.User;
import com.QueueIt.capstone.API.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

public class RequestAuthenticator {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    public RequestAuthenticator() {
    }

    public Boolean Authenticate(HttpServletRequest request, Long userID){
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer")){
            return Boolean.FALSE;
        }
        //beginIndex 7 kay gikan sa Bearer + space kay 7 characters. Refer to line 26
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        User user1 = userRepository.findById(userID).get();
        User user2 = userRepository.findByUsername(username).get();
        if (user1.equals(user2)){
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
