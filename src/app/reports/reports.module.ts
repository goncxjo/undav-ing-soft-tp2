import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    ReportsRoutingModule,
    NgxChartsModule
  ]
})
export class ReportsModule { }
