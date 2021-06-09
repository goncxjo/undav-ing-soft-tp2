import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.toastr.error('La sesión ha caducado.', 'Error');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}