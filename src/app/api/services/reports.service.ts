import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Survey } from '../models/survey';
import { SurveyService } from './survey.service';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseRoute: string;

  constructor(
    private surveyService: SurveyService
  ) { 
  }

  async getReport(): Promise<any> {
    let data = await this.surveyService.getSurveysAsPromise()

    let report = new Report();
    const surveys = _.map(data, (s: any) => new Survey(s));
    
    report.potentialCustomers = _.filter(surveys, s => s.isPotentialCustomer());
    report.notPotentialCustomers = _.filter(surveys, s => !s.isPotentialCustomer());
    console.log(surveys);
    console.log(report);

    return report;
  }

  private onError(err): void {
    console.log(err);
  }
}
