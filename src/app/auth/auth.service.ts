import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { UserBasicData } from '../models/user-basic-data';
import { UsersService } from '../security/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseRoute: string;
  private userEmail: string;
  private userPassword: string;
  private subscription;
  
  currentUser$: Observable<UserBasicData>;
  private userSubject: Subject<UserBasicData>;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private userService: UsersService
  ) {
    this.baseRoute = '/api';
    this.userSubject = new Subject<UserBasicData>();
    this.currentUser$ = this.userSubject.asObservable();
    this.restoreSession();
  }

  login(email: string, password: string) {
    const url = `${this.baseRoute}/login`;
    this.userEmail = email ;
    this.userPassword = password; 

    this.http.post(url, { email: this.userEmail, password: this.userPassword })
      .subscribe(
        data => this.onSuccess(data),
        err => this.onError(err)    
      );
  }

  onSuccess(resp) {
    this.subscription = this.userService.getUsersByEmail(this.userEmail).subscribe(
      data => this.onLogin(resp, data),
      err => this.onError(err)
    );
  }

  onLogin(resp, data) {
    let user = new UserBasicData(data[0]);
    this.currentUser = user;
    localStorage.setItem('accessToken', resp.accessToken);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['']);
  }

  private restoreSession() {
    let user = this.getCurrentUserLocalStorage();
    if(user) {
      this.userEmail = new UserBasicData(JSON.parse(user)).email;
      this.subscription = this.userService.getUsersByEmail(this.userEmail).subscribe(
        data => this.currentUser = new UserBasicData(data[0]),
        err => this.onError(err)
      );
    }
  }

  onError(msg) {
    this.toastr.error('El email no existe o el email/contraseña son incorrectos.', 'Error');
    this.userEmail = undefined;
    this.userPassword = undefined;
  }

  public static getToken() {
    return localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  private getCurrentUserLocalStorage() {
    return localStorage.getItem('currentUser');
  }


  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');

    this.cleanCurrentUser();
    this.router.navigate(['login']);
  }
 
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  cleanCurrentUser() {
    this.currentUser = new UserBasicData();
  }

  set currentUser(newValue: UserBasicData) {
    this.userSubject.next(newValue);
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
