import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

import { UsersAdminComponent } from './users/users-admin/users-admin.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';



@NgModule({
  declarations: [
    SecurityComponent,
    UsersAdminComponent,
    UsersEditComponent,
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
