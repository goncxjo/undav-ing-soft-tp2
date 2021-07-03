import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesAdminComponent } from './roles-admin/roles-admin.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RolesRoutingModule } from './roles-routing.module';



@NgModule({
  declarations: [
    RolesAdminComponent,
    RolesEditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
