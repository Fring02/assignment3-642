import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'survey', component: SurveyFormComponent },
  { path: 'surveys', component: SurveyListComponent },
];
