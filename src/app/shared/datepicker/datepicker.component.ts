import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass']
})
export class DatepickerComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() disabled: boolean;
  model: NgbDateStruct;

  constructor() { }

  ngOnInit() { 
    let defaultDate = this.form.controls[this.name].value;
    this.model = defaultDate;
  }

  onDateSelection(date: NgbDateStruct) {
    this.form.controls[this.name].patchValue(date);
  }
}
