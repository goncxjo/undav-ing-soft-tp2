import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { SharedModule } from 'tmp/app/shared/shared.module';
import { LayoutModule } from 'tmp/app/layout/layout.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
