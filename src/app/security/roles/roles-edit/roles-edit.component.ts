import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  readonly: any;

  constructor(
    private route: ActivatedRoute
    , private location: Location
    , private service: RolesService
    , private toastr: ToastrService
  ) {
    this.subscription = this.route.data.subscribe((data: { entity: Role }) => {
      this.title = data['title'];
      this.isEdit = data['isEdit'];
      this.readonly = data['readonly'];
      this.entity = data.entity;

      this.roleForm = new FormGroup({
        id: new FormControl({ value: this.entity.id || '', disabled: this.readonly }),
        name: new FormControl({ value: this.entity.name || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        details: new FormControl({ value: this.entity.details || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
      });  
    });
  }

  ngOnInit() {
  }

  saveEntity() {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}