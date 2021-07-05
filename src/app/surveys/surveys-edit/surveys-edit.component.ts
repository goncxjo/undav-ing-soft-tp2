import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { SurveysService } from '../surveys.service';
import { Survey } from 'src/app/models/survey';
import * as _ from 'lodash';

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

      this.surveyForm = new FormGroup({
        id: new FormControl({ value: this.entity.id || '', disabled: this.readonly }),
        name: new FormControl({ value: this.entity.name || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        surname: new FormControl({ value: this.entity.surname || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        age: new FormControl({ value: this.entity.age || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        phone: new FormControl({ value: this.entity.phone || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        email: new FormControl({ value: this.entity.email || '', disabled: this.readonly }, [Validators.required, Validators.minLength(2)]),
        otherPhone: new FormControl({ value: this.entity.otherPhone || '', disabled: this.readonly }),
        vehicles: new FormControl({ value: this.entity.vehicles || [], disabled: this.readonly }),
        createdDate: new FormControl({ value: { year: createdDate.getFullYear(), month: createdDate.getMonth() + 1, day: createdDate.getDate()}, disabled: this.readonly }, [Validators.required]),
        modifiedDate: new FormControl({ value: new Date(), disabled: this.readonly }),
        alreadyBought: new FormControl({ value: this.entity.alreadyBought || false, disabled: this.readonly }),
      });
    });
  }

  ngOnInit() {
  }

  saveEntity() {
    let entity = this.surveyForm.value;
    let datee = new Date(entity.createdDate.year, entity.createdDate.month - 1, entity.createdDate.day);

    entity.createdDate = datee;

    this.service.save(entity)
      .then(() => this.onSuccess())
      .catch((msg) => this.onError(msg));
  }

  onSuccess() {
    this.toastr.success('Encuesta ' + (this.isEdit ? 'actualizado' : 'creado'), 'Operación exitosa');
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
