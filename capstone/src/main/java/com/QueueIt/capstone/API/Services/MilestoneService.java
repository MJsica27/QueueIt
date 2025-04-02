package com.QueueIt.capstone.API.Services;
import com.QueueIt.capstone.API.DTO.MilestoneDTO;
import com.QueueIt.capstone.API.DTO.MilestoneSetDTO;
import com.QueueIt.capstone.API.DTO.ModuleDTO;
import com.QueueIt.capstone.API.DTO.TaskDTO;
import com.QueueIt.capstone.API.Entities.Milestone;
import com.QueueIt.capstone.API.Entities.MilestoneSet;
import com.QueueIt.capstone.API.Entities.Module;
import com.QueueIt.capstone.API.Entities.Task;
import com.QueueIt.capstone.API.Middlewares.MilestoneSetAlreadyExistException;
import com.QueueIt.capstone.API.Repository.MilestoneRepository;
import com.QueueIt.capstone.API.Repository.MilestoneSetRespository;
import com.QueueIt.capstone.API.Repository.ModuleRepository;
import com.QueueIt.capstone.API.Repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneSetRespository milestoneSetRespository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Transactional
    public MilestoneSet createMilestoneSet(MilestoneSetDTO milestoneSetDTO) throws MilestoneSetAlreadyExistException {
        if (milestoneSetRespository.findByTeamID(milestoneSetDTO.getTeamID()).isPresent()){
            throw new MilestoneSetAlreadyExistException("Already exist");
        }
        MilestoneSet milestoneSet = new MilestoneSet(
                milestoneSetDTO.getTeamName(),
                milestoneSetDTO.getTeamID(),
                milestoneSetDTO.getApproverID()
        );

        milestoneSet = milestoneSetRespository.save(milestoneSet);

        for (int i = 0; i < milestoneSetDTO.getMilestones().size(); i++){
            MilestoneDTO milestoneDTO = milestoneSetDTO.getMilestones().get(i);

            Milestone milestone = new Milestone(
                    milestoneDTO.getTitle(),
                    i,
                    milestoneSet
            );

            milestone = milestoneRepository.save(milestone);

            for (ModuleDTO moduleDTO: milestoneDTO.getModules()){
                Module module = new Module(
                        moduleDTO.getModuleName(),
                        milestone
                );
                module = moduleRepository.save(module);

                for (TaskDTO taskDTO: moduleDTO.getTasks()){
                    Task task = new Task(
                            taskDTO.getTaskDescription(),
                            taskDTO.getTaskName(),
                            module
                    );

                    task = taskRepository.save(task);
                    module.getTasks().add(task);
                }

                module = moduleRepository.save(module);

                milestone.getModules().add(module);
            }
            milestone = milestoneRepository.save(milestone);

            milestoneSet.getMilestones().add(milestone);
        }

        return milestoneSetRespository.save(milestoneSet);
    }

    public MilestoneSet getMilestoneSet(Long teamID){
        return milestoneSetRespository.findByTeamID(teamID).orElseThrow();
    }

    @Transactional
    public void updateMilestoneSet(MilestoneSetDTO milestoneSetDTO) throws MilestoneSetAlreadyExistException {
        MilestoneSet milestoneSet = milestoneSetRespository.findByTeamID(milestoneSetDTO.getTeamID()).orElseThrow(()->new RuntimeException("Milestone set not found"));
        List<Milestone> milestones = milestoneSet.getMilestones();
        for (Milestone milestone: milestones){
            List<Module> modules = milestone.getModules();
            for (Module module: modules){
                List<Task> tasks = module.getTasks();
                module.getTasks().clear();
            }
            milestone.getModules().clear();
        }
        milestoneSet.getMilestones().clear();
        milestoneSetRespository.delete(milestoneSet);

        createMilestoneSet(milestoneSetDTO);

    }


}
