import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      // entity: GetSurveysResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditComponent,
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
