import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../api/models/report';
import { ReportsService } from '../api/services/reports.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  subscription: Subscription;
  report: Report;
  report_: Observable<Report>;

  constructor(
    private reportService: ReportsService
  ) { }

  ngOnInit() {
  }

  getReport() {
     this.reportService.getReport()
     .then(data => {
        this.report = data
        console.log(this.report);
     })
     .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
