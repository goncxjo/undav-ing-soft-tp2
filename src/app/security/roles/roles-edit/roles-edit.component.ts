import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/api/models/role';
import { RolesService } from 'src/app/api/services/roles.service';

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.sass']
})
export class RolesEditComponent implements OnInit {
  subscription: any;
  entity: Role;
  roleForm: any;
  title: string;
  isEdit: string;

  constructor(
    private route: ActivatedRoute
    , private location: Location
    , private service: RolesService
    , private toastr: ToastrService
    , private fb: FormBuilder
  ) {
    this.roleForm = this.fb.group({
      id: '',
      name: '',
      details: '',
    });
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((data: { entity: Role, mode: string }) => {
      this.entity = data.entity;
      this.title = data['title'];
      this.isEdit = data['isEdit'];
    })
  }

  onSubmit() {
      this.service.save(this.roleForm.value)
      .then(() => this.onSuccess())
      .catch((msg) => this.onError(msg));
  }

  onSuccess() {
    this.toastr.success('Rol ' + (this.isEdit ? 'actualizado' : 'creado'), 'Operación exitosa');
    this.goBack();
  }

  onError(msg) {
    this.toastr.error(msg, 'Operación fallida');
  }

  goBack(): void {
    this.location.back();
  }
}
