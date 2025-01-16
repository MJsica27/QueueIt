package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.Classroom;
import com.QueueIt.capstone.API.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
    public List<Classroom> findByAdviserID(Long userID);
    List<Classroom> findByStudentsContaining(Student student);
    public Classroom findByClassCode(String classCode);

    @Query("SELECT COUNT(s) FROM Student s JOIN s.classrooms c WHERE c.classID = :classID")
    Long getStudentHeadCount(Long classID);

}
