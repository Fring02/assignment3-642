import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { Survey } from '../model/Survey';
@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent {
  survey: Survey = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    email: '',
    dateOfSurvey: '',
    likedFeatures: [],
    interestSource: '',
    recommendationLikelihood: '',
    additionalComments: '',
  };

  constructor(private surveyService: SurveyService, private router: Router) {}

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      // Add the selected value to the array
      this.survey.likedFeatures.push(value);
    } else {
      // Remove the unselected value from the array
      this.survey.likedFeatures = this.survey.likedFeatures.filter(
        (feature) => feature !== value
      );
    }
  }

  onSubmit(): void {
    // Send the survey data to the server
    this.surveyService.createSurvey(this.survey).subscribe(
      (response) => {
        console.log('Survey submitted successfully:', response);
        // Reset the form
        this.onCancel();
        // Navigate to the root route
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error submitting survey:', error);
      }
    );
  }

  onCancel(): void {
    // Reset form
    this.survey = {
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      email: '',
      dateOfSurvey: '',
      likedFeatures: [],
      interestSource: '',
      recommendationLikelihood: '',
      additionalComments: '',
    };
  }
}
