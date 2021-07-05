import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { UsersRoutingModule } from './users-routing.module';
import { RolesSelectorComponent } from '../roles/roles-selector/roles-selector.component';



@NgModule({
  declarations: [
    UsersAdminComponent,
    UsersEditComponent,
    RolesSelectorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
