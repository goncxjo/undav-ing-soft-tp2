import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api/users'
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseRoute}`
    return this.http.get<User[]>(url);
  }

  getById(id): Observable<User> {
    const url = `${this.baseRoute}/${id}`
    return this.http.get<User>(url);
  }

  getUsersByEmail(email): Observable<User> {
    const url = `${this.baseRoute}?email=${email}`
    return this.http.get<User>(url);
  }
}
