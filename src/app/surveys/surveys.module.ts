import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysAdminComponent } from './surveys-admin/surveys-admin.component';
import { SurveysEditComponent } from './surveys-edit/surveys-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { SurveysRoutingModule } from './surveys-routing.module';



@NgModule({
  declarations: [
    SurveysAdminComponent,
    SurveysEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    SurveysRoutingModule
  ]
})
export class SurveysModule { }
