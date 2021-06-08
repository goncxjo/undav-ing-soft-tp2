import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { GetRolesListResolver } from './get-roles-list.resolver';
import { UsersListComponent } from './users/users-list/users-list.component';
import { GetUsersListResolver } from './get-users-list.resolver';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  { path: '', component: SecurityComponent },
  {
    path: 'roles',
    component: RolesListComponent,
    resolve: {
      entity: GetRolesListResolver
    }
  },
  {
    path: 'users',
    component: UsersListComponent,
    resolve: {
      entity: GetUsersListResolver
    }
  },
  // { path: '', redirectTo: 'roles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GetRolesListResolver,
    GetUsersListResolver
  ]
})
export class SecurityRoutingModule { }
