import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/api/models/role';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.sass']
})
export class RolesListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize: number;
  ROLES: Role[]
  roles: Role[]
  private subscription;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe((data: { entity: Role[] }) => {
      this.ROLES = data.entity;
      this.collectionSize = this.ROLES.length;
      this.refreshRoles();
    })
  }

  get noData() {
    return this.ROLES.length === 0
  }

  refreshRoles() {
    this.roles = this.ROLES
      .map((role, i) => ({id: i + 1, ...role}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  }
}
