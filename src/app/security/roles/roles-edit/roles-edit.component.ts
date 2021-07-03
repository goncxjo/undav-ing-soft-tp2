import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/api/models/role';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.sass']
})
export class RolesEditComponent implements OnInit {
  subscription: any;
  entity: Role;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe((data: { entity: Role }) => {
      this.entity = data.entity;
    })
  }
}
