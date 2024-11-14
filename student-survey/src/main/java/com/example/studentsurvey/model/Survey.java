package com.example.studentsurvey.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "surveys")
@Data
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;
    private String phoneNumber;
    private String email;
    private String dateOfSurvey;
    @ElementCollection
    private List<String> likedFeatures;
    private String interestSource;
    private String recommendationLikelihood;
    private String additionalComments;
}

