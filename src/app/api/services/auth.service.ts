import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api';
  }

  login(data): Observable<any> {
    const url = `${this.baseRoute}/login`;
    return this.http.post(url, data);
  }
}
