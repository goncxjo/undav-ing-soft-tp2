import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api/roles'
  }

  getRoles(): Observable<Role[]> {
    const url = `${this.baseRoute}`
    return this.http.get<Role[]>(url);
  }

  getById(id): Observable<Role> {
    const url = `${this.baseRoute}/${id}`
    return this.http.get<Role>(url);
  }
}
