import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { GetUsersListResolver } from './get-users-list.resolver';
import { GetUserResolver } from './get-user-resolver';
import { GetNewUserResolver } from './get-new-user-resolver';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { AuthGuardService as AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  {
    path: 'admin',
    pathMatch: 'full',
    component: UsersAdminComponent,
    resolve: {
      entity: GetUsersListResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UsersEditComponent,
    resolve: {
      entity: GetUserResolver
    },
    data: { title: 'Editar Usuario', isEdit: true, readonly: false },
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: UsersEditComponent,
    resolve: {
      entity: GetNewUserResolver
    },
    data: { title: 'Crear Usuario', isEdit: false, readonly: false },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: UsersEditComponent,
    resolve: {
      entity: GetUserResolver
    },
    data: { title: 'Visualizar Usuario', isEdit: false, readonly: true },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GetUsersListResolver,
    GetNewUserResolver,
    GetUserResolver,
    AuthGuard
  ]
})
export class UsersRoutingModule { }
