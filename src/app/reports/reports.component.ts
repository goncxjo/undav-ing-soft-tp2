import { Component, OnInit } from '@angular/core';
import { Report } from '../api/models/report';
import { ReportsService } from '../api/services/reports.service';
import * as _ from 'lodash';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
  xAxisLabelVehiculos: string = 'Total %';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private reportService: ReportsService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) { 
    this.calculateDimension(innerWidth);
    this.initReportModel();
    this.noData = true;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
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
    let fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    let toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

     this.reportService.getReport(fromDate, toDate)
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
