import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesAdminComponent } from './roles-admin/roles-admin.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesSelectorComponent } from './roles-selector/roles-selector.component';

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  SharedModule,
  LayoutModule,
  RolesRoutingModule
]

const PRIVATE_COMPONENTS = [
];

const PUBLIC_COMPONENTS = [
  RolesAdminComponent,
  RolesEditComponent,
  RolesSelectorComponent,
  RolesSelectorComponent,
]

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  // entryComponents: [NgbModalYesNoComponent],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ]
})
export class RolesModule { }
