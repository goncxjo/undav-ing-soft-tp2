import { Component, OnInit } from '@angular/core';
import { Report } from '../api/models/report';
import { ReportsService } from '../api/services/reports.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  report: Report;
  noData: boolean = false;
  view: any[];
  results;

  // options
  yAxisLabel: string = 'Clientes';
  xAxisLabel: string = 'Cantidad';
  yAxisLabelVehiculos: string = 'Vehiculos';
  xAxisLabelVehiculos: string = 'Cantidad';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private reportService: ReportsService
  ) { 
    this.calculateDimension(innerWidth);
    this.initReportModel();
    this.noData = true;
  }

  private initReportModel() {
    this.results = {
      potenciales: [],
      vehiculos: [],
    };
  }

  calculateDimension(innerWidth) {
    this.view = [ innerWidth / 3.2, 150 ];
  }

  ngOnInit() {
  }

  getReport() {
     this.reportService.getReport()
     .then((data: Report) => {
        this.initReportModel();
        let results = this.results;
        
        results.potenciales.push({ name: "Potenciales", value: data.potentialCustomers.length });
        results.potenciales.push({ name: "No cumplen", value: data.notPotentialCustomers.length });
        
        results.vehiculos.push({ name: "Motocicleta", series: this.getSeriesMotocicleta(data) });
        results.vehiculos.push({ name: "Auto", series: this.getSeriesAuto(data) });
        results.vehiculos.push({ name: "Camioneta", series: this.getSeriesCamioneta(data) });
        
        console.log('component',results);
        this.report = data;
        this.noData = data.total() == 0;
        Object.assign(this.results, results);
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
