package com.example.studentsurvey.repository;

import com.example.studentsurvey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}

