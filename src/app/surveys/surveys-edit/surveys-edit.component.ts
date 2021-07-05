import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { SurveysService } from '../surveys.service';
import { Survey } from 'src/app/models/survey';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Vehicle } from 'src/app/models/vehicle';
import { _MAT_INK_BAR_POSITIONER_FACTORY } from '@angular/material/tabs/typings/ink-bar';

@Component({
  selector: 'app-surveys-edit',
  templateUrl: './surveys-edit.component.html',
  styleUrls: ['./surveys-edit.component.sass']
})
export class SurveysEditComponent implements OnInit {
  subscription: any;
  entity: Survey;
  surveyForm: any;
  title: string;
  isEdit: string;
  readonly: any;
  model: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0,
  };

  constructor(
    private route: ActivatedRoute
    , private location: Location
    , private service: SurveysService
    , private toastr: ToastrService
  ) {
    this.subscription = this.route.data.subscribe((data: { entity: Survey }) => {
      this.title = data['title'];
      this.isEdit = data['isEdit'];
      this.readonly = data['readonly'];
      this.entity = data.entity;

      let createdDate = new Date(this.entity.createdDate) || new Date();

      this.model.year = createdDate.getFullYear();
      this.model.month = createdDate.getMonth();
      this.model.day = createdDate.getDay();

      this.surveyForm = new FormGroup({
        id: new FormControl({ value: this.entity.id || '', disabled: this.readonly }),
        name: new FormControl({ value: this.entity.name || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        surname: new FormControl({ value: this.entity.surname || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        age: new FormControl({ value: this.entity.age || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        phone: new FormControl({ value: this.entity.phone || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        email: new FormControl({ value: this.entity.email || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        otherPhone: new FormControl({ value: this.entity.otherPhone || '', disabled: this.readonly }),
        vehicles: new FormArray([
          new FormControl()
        ]),
        createdDate: new FormControl({ value: createdDate, disabled: this.readonly }, [Validators.required]),
      });
    });
  }

  onVehiclesChange(e) {
    let vehicles = _.split(e.target.value, ',');

    let vechiclesEnum = _.map(vehicles, v => {
      if (v == "car" || v == "auto" ) {
        return Vehicle.Car;
      }
      else if (v == "van" || v == "camioneta" ) {
        return Vehicle.Van;
      }
      else if (v == "motorcycle" || v == "moto" || v == "motocicleta" ) {
        return Vehicle.Motorcycle;
      }
    });

    this.surveyForm.value['vehicles'] = vechiclesEnum;
  }

  ngOnInit() {
  }

  saveEntity() {
    this.service.save(this.surveyForm.value)
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
