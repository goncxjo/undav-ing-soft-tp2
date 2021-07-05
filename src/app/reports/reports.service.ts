import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Survey } from '../models/survey';
import { SurveysService } from '../surveys/surveys.service';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseRoute: string;

  constructor(
    private SurveysService: SurveysService
  ) { 
  }

  async getReport(fromDate: Date, toDate: Date): Promise<any> {
    let data = await this.SurveysService.getSurveysAsPromise()

    let report = new Report();
    const surveys = _.map(data, (s: any) => new Survey(s)).filter((s: Survey) => fromDate <= s.createdDate && s.createdDate <= toDate);
    
    report.potentialCustomers = _.filter(surveys, s => s.isPotentialCustomer());
    report.potentialCustomersAlreadyBought = _.filter(report.potentialCustomers, s => s.alreadyBought);
    report.notPotentialCustomers = _.filter(surveys, s => !s.isPotentialCustomer());

    return report;
  }

  private onError(err): void {
    console.log(err);
  }
}
