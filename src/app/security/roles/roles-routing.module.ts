import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesAdminComponent } from './roles-admin/roles-admin.component';
import { GetRolesListResolver } from '../get-roles-list.resolver';
import { GetRoleResolver } from '../get-role-resolver';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { AuthGuardService as AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'admin' },
  {
    path: 'admin',
    pathMatch: 'full',
    component: RolesAdminComponent,
    resolve: {
      entity: GetRolesListResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: RolesEditComponent,
    resolve: {
      entity: GetRoleResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: RolesEditComponent,
    resolve: {
      entity: GetRoleResolver
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GetRolesListResolver,
    GetRoleResolver,
    AuthGuard
  ]
})
export class RolesRoutingModule { }
