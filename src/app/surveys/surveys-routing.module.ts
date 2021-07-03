import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { SurveysAdminComponent } from './surveys-admin/surveys-admin.component';
import { SurveysEditComponent } from './surveys-edit/surveys-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: SurveysAdminComponent,
    resolve: {
      // entity: GetSurveysResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: SurveysEditComponent,
    resolve: {
      // entity: GetSurveyResolver
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class SurveysRoutingModule { }
