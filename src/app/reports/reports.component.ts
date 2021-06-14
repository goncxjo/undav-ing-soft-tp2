import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../api/models/report';
import { ReportsService } from '../api/services/reports.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Survey } from '../api/models/survey';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  subscription: Subscription;
  report: Report;
  report_: Observable<Report>;
  noData: boolean;

  results: any[];
  view: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(
    private reportService: ReportsService
  ) { 
    this.view = [500, 400];
    this.results = []
    this.noData = true;
  }

  ngOnInit() {
  }

  getReport() {
     this.reportService.getReport()
     .then(data => {
       let results = [];
       results.push({ name: "Pot. Clientes", value: data.totalPotentialCustomers() });
       results.push({ name: "Otros", value: data.totalNotPotentialCustomers() });
       
       this.report = data;
       this.noData = data.total() == 0;
       Object.assign(this.results, results);
     })
     .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
