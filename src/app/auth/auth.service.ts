import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.baseRoute = '/api';
  }

  login(email: string, password: string) {
    const url = `${this.baseRoute}/login`;
    this.http.post(url, { email: email, password: password })
      .subscribe(
        data => this.onSuccess(data),
        err => this.onError(err)    
      );
  }

  onSuccess(resp) {
    localStorage.setItem('accessToken', resp.accessToken);
    this.router.navigate(['']);
  }

  onError(msg) {
    console.log(msg);
    this.toastr.error('El email no existe o el email/contraseña son incorrectos.', 'Error');
  }

  public static getToken() {
    return localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }


  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
  }
 
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
