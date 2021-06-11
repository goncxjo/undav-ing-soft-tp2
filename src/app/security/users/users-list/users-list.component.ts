import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserList } from 'src/app/api/models/user-list';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number;
  USERS: UserList[]
  users: UserList[]
  private subscription;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe((data: { entity: UserList[] }) => {
      this.USERS = data.entity;
      this.collectionSize = this.USERS.length;
      this.refreshUsers();
    })
  }

  get noData() {
    return this.USERS.length === 0
  }

  refreshUsers() {
    this.users = this.USERS
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
