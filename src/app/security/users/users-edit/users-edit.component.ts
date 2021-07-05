import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.sass']
})
export class UsersEditComponent implements OnInit {
  subscription: any;
  entity: User;
  roleForm: any;
  title: string;
  isEdit: string;
  readonly: any;

  constructor(
    private route: ActivatedRoute
    , private location: Location
    , private service: UsersService
    , private toastr: ToastrService
  ) {
    this.subscription = this.route.data.subscribe((data: { entity: User }) => {
      this.title = data['title'];
      this.isEdit = data['isEdit'];
      this.readonly = data['readonly'];
      this.entity = data.entity;

      this.roleForm = new FormGroup({
        id: new FormControl({ value: this.entity.id || '', disabled: this.readonly }),
        firstName: new FormControl({ value: this.entity.firstName || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl({ value: this.entity.lastName || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        email: new FormControl({ value: this.entity.email || '', disabled: this.readonly }, [Validators.required, Validators.email]),
        password: new FormControl({ value: this.entity.password || '', disabled: this.readonly }, [Validators.required]),
        role: new FormControl({ value: this.entity.roleId || '', disabled: this.readonly }, [Validators.required]),
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
    this.toastr.success('Usuario ' + (this.isEdit ? 'actualizado' : 'creado'), 'Operación exitosa');
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
