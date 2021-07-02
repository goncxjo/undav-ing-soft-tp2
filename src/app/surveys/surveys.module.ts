import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [AdminComponent, EditComponent],
  imports: [
    CommonModule
  ]
})
export class SurveysModule { }
