import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysAdminComponent } from './surveys-admin/surveys-admin.component';
import { SurveysEditComponent } from './surveys-edit/surveys-edit.component';



@NgModule({
  declarations: [SurveysAdminComponent, SurveysEditComponent],
  imports: [
    CommonModule
  ]
})
export class SurveysModule { }
