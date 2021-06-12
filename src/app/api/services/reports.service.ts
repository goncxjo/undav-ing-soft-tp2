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
    report.potentialCustomers = _.filter(data, (s: any) => this.filterSurveys(s));
    report.count = report.potentialCustomers.length;

    return report;
  }

  private filterSurveys(s: any): boolean {
    const s_ = new Survey(s);
    return s_.isPotentialCustomer()
  }
  
  private onError(err): void {
    console.log(err);
  }
}
