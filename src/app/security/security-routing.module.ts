import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { UsersAdminComponent } from './users/users-admin/users-admin.component';
import { GetUsersListResolver } from './users/get-users-list.resolver';

const routes: Routes = [
  { path: '', component: SecurityComponent },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GetUsersListResolver,
    AuthGuard
  ]
})
export class SecurityRoutingModule { }
