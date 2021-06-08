import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LoginComponent },  // TODO: mejorar esto
  // {
  //   path: 'surveys',
  //   loadChildren: () => import('./surveys/surveys.module').then(m => m.SurveysModule),
  // },
  { path: 'surveys', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
  },
  { path: 'admin', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'reports', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
