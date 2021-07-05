import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles-multiselector',
  templateUrl: './vehicles-multiselector.component.html',
  styleUrls: ['./vehicles-multiselector.component.sass']
})
export class VehiclesMultiselectorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  entities: any[];
  defaultName: string = 'Vehículos';
  susbcription: Subscription;

  constructor(
    private service: VehiclesService
  ) {
    this.susbcription = this.service.getVehicles().subscribe(vehicles => {
      this.entities = vehicles;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }
}
