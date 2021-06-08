import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  // {
  //   path: 'surveys',
  //   loadChildren: () => import('./surveys/surveys.module').then(m => m.SurveysModule),
  // },
  { path: 'surveys', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
  },
  { path: 'admin', redirectTo: '/', pathMatch: 'full' },
  { path: 'reports', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
