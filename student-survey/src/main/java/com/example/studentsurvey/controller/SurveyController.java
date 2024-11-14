package com.example.studentsurvey.controller;

import com.example.studentsurvey.model.Survey;
import com.example.studentsurvey.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin("*")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @PostMapping
    public Survey createSurvey(@RequestBody Survey survey) {
        return surveyRepository.save(survey);
    }

    @GetMapping
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id, @RequestBody Survey updatedSurvey) {
        return surveyRepository.findById(id)
                .map(survey -> {
                    survey.setFirstName(updatedSurvey.getFirstName());
                    survey.setLastName(updatedSurvey.getLastName());
                    // ... Update all other fields
                    survey.setAdditionalComments(updatedSurvey.getAdditionalComments());
                    return ResponseEntity.ok(surveyRepository.save(survey));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurvey(@PathVariable Long id) {
        return surveyRepository.findById(id)
                .map(survey -> {
                    surveyRepository.delete(survey);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

