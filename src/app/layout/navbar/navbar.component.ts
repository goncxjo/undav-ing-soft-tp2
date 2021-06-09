import { Component, OnInit } from '@angular/core';
import { UserBasicData } from 'src/app/api/models/user-basic-data';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  private subscription;
  private user;
  private isAuthorized: boolean;
  
  constructor(
    public authService: AuthService
  ) {
      this.subscription = this.authService.currentUser$.subscribe(
        data => {
          this.user = data;
          this.isAuthorized = this.user.id;
        },
        err => console.log(err)
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe())
  }

  logout() {
    this.authService.logout();
  }
}
