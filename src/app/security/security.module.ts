import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';



@NgModule({
  declarations: [
    SecurityComponent,
    RolesListComponent,
    UsersListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
