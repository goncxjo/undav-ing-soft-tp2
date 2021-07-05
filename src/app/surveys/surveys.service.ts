import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Survey } from '../models/survey';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
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

  getNewSurvey(): Observable<Survey> {
    return of<Survey>(new Survey(null));
  }
  
  save(entity: Survey): Promise<Survey> {
    return (!entity.id) ? this.create(entity) : this.update(entity);
  }

  create(entity: Survey): Promise<Survey> {
    const url = `${this.baseRoute}`;
    entity.id = uuid.v4();
    return this.http.post<Survey>(url, entity).toPromise();
  }

  update(entity: Survey): Promise<Survey> {
    const url = `${this.baseRoute}/${entity.id}`;
    return this.http.put<Survey>(url, entity).toPromise();
  }

  delete(id: string): Promise<Survey> {
    console.log(id);
    const url = `${this.baseRoute}/${id}`;
    return this.http.delete<Survey>(url).toPromise();
  }
}
