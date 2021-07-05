import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { GetNewSurveyResolver } from './get-new-survey-resolver';
import { GetSurveyResolver } from './get-survey-resolver';
import { GetSurveysListResolver } from './get-surveys-list.resolver';
import { SurveysAdminComponent } from './surveys-admin/surveys-admin.component';
import { SurveysEditComponent } from './surveys-edit/surveys-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  {
    path: 'admin',
    pathMatch: 'full',
    component: SurveysAdminComponent,
    resolve: {
      entity: GetSurveysListResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: SurveysEditComponent,
    resolve: {
      entity: GetSurveyResolver
    },
    data: { title: 'Editar Encuesta', isEdit: true, readonly: false },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: SurveysEditComponent,
    resolve: {
      entity: GetNewSurveyResolver
    },
    data: { title: 'Crear Encuesta', isEdit: false, readonly: false },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: SurveysEditComponent,
    resolve: {
      entity: GetSurveyResolver
    },
    data: { title: 'Visualizar Encuesta', isEdit: false, readonly: true },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GetSurveysListResolver,
    GetNewSurveyResolver,
    GetSurveyResolver,
    AuthGuard
  ]
})
export class SurveysRoutingModule { }
