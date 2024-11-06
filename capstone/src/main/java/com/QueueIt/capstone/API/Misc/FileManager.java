package com.QueueIt.capstone.API.Misc;

import com.QueueIt.capstone.API.Requests.DeleteImageRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Component
public class FileManager {

    public FileManager() {
    }

    //ang file path, i right click ang profilePhotos folder > Copy Path/Reference > Absolute Path then i paste diha sa filePath nga variable
    public void saveProfilePhoto(MultipartFile multipartFile) throws IOException {
        String filePath = "D:\\CIT Learning Resources\\Capstone 1\\Capstone\\Backend\\QueueIt\\capstone\\src\\main\\resources\\profilePhotos\\";
        String unique_filepath = UUID.randomUUID()+multipartFile.getOriginalFilename();
        File file = new File(filePath+unique_filepath);
        multipartFile.transferTo(file);
    }

    public void updateProfilePhoto(MultipartFile multipartFile, String oldProfilePhotoFilePath) throws IOException {

        //i delete ang karaan nga image file sulod sa profilePhotos folder
        File file = new File(oldProfilePhotoFilePath);
        // i check sa if naa bajud sa folder ang picture.
        if (file.exists()){
            deleteProfilePhoto(oldProfilePhotoFilePath);

            //create dayon bag-o after i delete
            saveProfilePhoto(multipartFile);
        }

    }

    public void deleteProfilePhoto(String profilePhotoFilePath) throws IOException {
        Files.delete(Path.of(profilePhotoFilePath));
    }
}
