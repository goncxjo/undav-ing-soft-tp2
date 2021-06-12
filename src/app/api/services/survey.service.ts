import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api/surveys'
  }

  getSurveys(): Observable<Survey[]> {
    const url = `${this.baseRoute}`
    return this.http.get<Survey[]>(url);
  }

  getSurveysAsPromise(): Promise<Survey[]> {
    return this.getSurveys().toPromise();
  }

  getById(id): Observable<Survey> {
    const url = `${this.baseRoute}/${id}`
    return this.http.get<Survey>(url);
  }
}
