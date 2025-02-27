package com.QueueIt.capstone.API.Services;

import com.QueueIt.capstone.API.DTO.RubricDTO;
import com.QueueIt.capstone.API.Entities.Rubric;
import com.QueueIt.capstone.API.Entities.Criterion;
import com.QueueIt.capstone.API.Repositories.RubricRepository;
import com.QueueIt.capstone.API.Repositories.CriterionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RubricService {
    private final RubricRepository rubricRepository;
    private final CriterionRepository criterionRepository;

    public RubricService(RubricRepository rubricRepository, CriterionRepository criterionRepository) {
        this.rubricRepository = rubricRepository;
        this.criterionRepository = criterionRepository;
    }

    /**
     * ✅ CREATE a new rubric
     */
    @Transactional
    public Rubric createRubric(RubricDTO rubricDTO) {
        Rubric rubric = new Rubric(
                rubricDTO.getTitle(),
                rubricDTO.getDescription(),
                null,
                rubricDTO.getIsPrivate(),  // Fixed method name
                rubricDTO.getUserID()
        );

        Rubric savedRubric = rubricRepository.save(rubric);

        List<Criterion> criteria = rubricDTO.getCriteria().stream()
                .map(dto -> new Criterion(savedRubric, dto.getTitle(), dto.getDescription()))
                .collect(Collectors.toList());

        criterionRepository.saveAll(criteria);
        savedRubric.setCriteria(criteria);
        return rubricRepository.save(savedRubric);
    }

    /**
     * ✅ READ all rubrics (public system rubrics + user rubrics)
     */
    public List<Rubric> getRubrics(Long userID) {
        List<Rubric> userRubrics = rubricRepository.findByUserID(userID);
        List<Rubric> systemRubrics = rubricRepository.findByIsPrivateFalse();
        userRubrics.addAll(systemRubrics);
        return userRubrics;
    }

    /**
     * ✅ READ a single rubric by ID
     */
    public Optional<Rubric> getRubricById(Long rubricID) {
        return rubricRepository.findById(rubricID);
    }

    /**
     * ✅ UPDATE a rubric (if system-made, clone it first)
     */
    @Transactional
    public Rubric updateRubric(Long rubricID, RubricDTO rubricDTO) {
        Optional<Rubric> optionalRubric = rubricRepository.findById(rubricID);

        if (optionalRubric.isPresent()) {
            Rubric rubric = optionalRubric.get();

            // If it's a system rubric, create a new one for the user instead of updating
            if (!rubricDTO.getIsPrivate()) {
                return editSystemRubric(rubricID, rubricDTO);
            }

            rubric.setTitle(rubricDTO.getTitle());
            rubric.setDescription(rubricDTO.getDescription());
            rubric.setIsPrivate(rubricDTO.getIsPrivate()); // Fixed setter method

            // Clear old criteria and save new ones
            criterionRepository.deleteAll(rubric.getCriteria());
            List<Criterion> newCriteria = rubricDTO.getCriteria().stream()
                    .map(dto -> new Criterion(rubric, dto.getTitle(), dto.getDescription()))
                    .collect(Collectors.toList());

            rubric.setCriteria(newCriteria);
            criterionRepository.saveAll(newCriteria);

            return rubricRepository.save(rubric);
        }

        return null;
    }

    /**
     * ✅ DELETE a rubric by ID
     */
    @Transactional
    public boolean deleteRubric(Long rubricID) {
        if (rubricRepository.existsById(rubricID)) {
            rubricRepository.deleteById(rubricID);
            return true;
        }
        return false;
    }
    /**
     * ✅ Clone system rubric when user edits it
     */
    @Transactional
    public Rubric editSystemRubric(Long rubricID, RubricDTO rubricDTO) {
        Optional<Rubric> optionalRubric = rubricRepository.findById(rubricID);
        if (optionalRubric.isPresent()) {
            Rubric originalRubric = optionalRubric.get();

            // Clone the rubric under user's ownership
            Rubric clonedRubric = new Rubric(
                    rubricDTO.getTitle(),
                    rubricDTO.getDescription(),
                    null, // Will be set after saving
                    true, // Make it private for the user
                    rubricDTO.getUserID()
            );

            Rubric savedClonedRubric = rubricRepository.save(clonedRubric);

            List<Criterion> clonedCriteria = rubricDTO.getCriteria().stream()
                    .map(dto -> new Criterion(savedClonedRubric, dto.getTitle(), dto.getDescription()))
                    .collect(Collectors.toList());

            criterionRepository.saveAll(clonedCriteria);
            savedClonedRubric.setCriteria(clonedCriteria);
            return rubricRepository.save(savedClonedRubric);
        }
        return null;
    }

    /**
     * ✅ Create default system rubrics on startup
     */
    @PostConstruct
    public void createDefaultRubrics() {
        if (rubricRepository.findByIsPrivateFalse().isEmpty()) {
            Rubric systemRubric = new Rubric("General Rubric", "Standard evaluation rubric", null, false, null);
            rubricRepository.save(systemRubric);
        }
    }
}
