import { Component, OnInit } from '@angular/core';
import { Report } from '../models/report';
import { ReportsService } from './reports.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  noData: boolean = false;
  showWarning: boolean = false;

  view: any[];
  report: any;

  fromDate: Date;
  toDate: Date;

  // options
  yAxisLabel: string = 'Clientes';
  xAxisLabel: string = 'Cantidad';
  yAxisLabelVehiculos: string = 'Vehiculos';
  xAxisLabelVehiculos: string = 'Total %';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private reportService: ReportsService,

  ) { 
    this.calculateDimension(innerWidth);
    this.initReportModel();
    this.noData = true;
  }

  private initReportModel() {
    this.report = {
      potenciales: [],
      vehiculos: [],
    };
  }

  calculateDimension(innerWidth) {
    this.view = [ innerWidth / 3.2, 150 ];
  }

  ngOnInit() {
  }

  onDatePickedHandler(data: string) {
    const dateRange = JSON.parse(data);
    this.fromDate = new Date(dateRange.fromDate) || null;
    this.toDate = new Date(dateRange.toDate) || null;
  }

  getReport() {
     this.reportService.getReport(this.fromDate, this.toDate)
     .then((data: Report) => {
        this.initReportModel();
        let results = this.report;
        this.noData = data.total() == 0;
        this.showWarning = true;

        if(!this.noData) {
          results.potenciales.push({ name: "Potenciales", value: data.potentialCustomers.length });
          results.potenciales.push({ name: "No cumplen", value: data.notPotentialCustomers.length });
  
          results.vehiculos.push({ name: "Motocicleta", series: this.getSeriesMotocicleta(data) });
          results.vehiculos.push({ name: "Auto", series: this.getSeriesAuto(data) });
          results.vehiculos.push({ name: "Camioneta", series: this.getSeriesCamioneta(data) });
          
          Object.assign(this.report, results);
        }
     })
     .catch(err => console.log(err));
  }

  // TODO: mejorar esto
  getSeriesCamioneta(data: Report) {
    const potenciales = _.filter(data.potentialCustomers, s => s.hasVan());
    const otros = _.filter(data.notPotentialCustomers, s => s.hasVan());
    return [
      { name: "potenciales clientes", value: potenciales.length },
      { name: "no cumplen", value: otros.length }
    ];
  }

  getSeriesAuto(data: Report) {
    const potenciales = _.filter(data.potentialCustomers, s => s.hasCar());
    const otros = _.filter(data.notPotentialCustomers, s => s.hasCar());
    return [
      { name: "potenciales clientes", value: potenciales.length },
      { name: "no cumplen", value: otros.length }
    ];
  }
  getSeriesMotocicleta(data: Report) {
    const potenciales = _.filter(data.potentialCustomers, s => s.hasMotorcycle());
    const otros = _.filter(data.notPotentialCustomers, s => s.hasMotorcycle());
    return [
      { name: "potenciales clientes", value: potenciales.length },
      { name: "no cumplen", value: otros.length }
    ];
  }

  // view is the variable used to change the chart size (Ex: view = [width, height])
  onResize(event) {
    this.calculateDimension(event.target.innerWidth);
  }
}
