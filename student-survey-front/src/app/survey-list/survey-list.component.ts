import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { RouterModule } from '@angular/router';
import { Survey } from '../model/Survey';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];
  selectedSurvey: Survey | null = null;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
  }

  onDelete(id: number): void {
    this.surveyService.deleteSurvey(id).subscribe(() => {
      this.surveys = this.surveys.filter((survey) => survey.id !== id);
    });
  }

  onEdit(id: number): void {
    const surveyToEdit = this.surveys.find((survey) => survey.id === id);
    if (surveyToEdit) {
      this.selectedSurvey = { ...surveyToEdit }; // Clone the survey object
    }
  }

  onSaveEdit(): void {
    if (this.selectedSurvey && this.selectedSurvey.id) {
      this.surveyService.updateSurvey(this.selectedSurvey.id, this.selectedSurvey).subscribe((updatedSurvey) => {
        const index = this.surveys.findIndex((survey) => survey.id === updatedSurvey.id);
        if (index !== -1) {
          this.surveys[index] = updatedSurvey; // Update the survey in the list
        }
        this.selectedSurvey = null; // Clear the edit form
      });
    }
  }

  onCancelEdit(): void {
    this.selectedSurvey = null; // Clear the edit form
  }
}
