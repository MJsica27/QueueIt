package com.QueueIt.capstone.API.Controllers;

import com.QueueIt.capstone.API.Services.ProgressTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/note")
public class ProgressTrackingController {

    @Autowired
    private ProgressTrackingService progressTrackingService;


}
