import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/api/models/role';

@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.sass']
})
export class RolesAdminComponent implements OnInit {
  private subscription: Subscription;
  ENTITIES: Role[]
  // pagination
  entities: Role[]
  page = 1;
  pageSize = 5;
  collectionSize: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe((data: { entity: Role[] }) => {
      this.ENTITIES = data.entity;
      this.collectionSize = this.ENTITIES.length;
      this.refreshEntities();
    })
  }

  get noData() {
    return this.ENTITIES.length === 0
  }

  refreshEntities() {
    this.entities = _
      .map(this.ENTITIES, (entity, i) => ({ id: i + 1, ...entity }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
