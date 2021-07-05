import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';



@NgModule({
  declarations: [
    SecurityComponent,
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
