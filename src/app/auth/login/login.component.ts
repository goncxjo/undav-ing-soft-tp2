import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router
    , private authService: AuthService
    , private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).toPromise()
    .then((token) => this.onSuccess(token))
    .catch((msg) => this.onError(msg));
  }

  onSuccess(token) {
    // TODO: gestionar este token para validar accesos.
    console.log(token);
    this.router.navigate(['/']);
  }

  onError(msg) {
    console.log(msg);
  }}
