import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles-selector',
  templateUrl: './roles-selector.component.html',
  styleUrls: ['./roles-selector.component.sass']
})
export class RolesSelectorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  entities: any[];
  defaultName: string = 'Roles';
  susbcription: Subscription;

  constructor(
    private service: RolesService
  ) {
    this.susbcription = this.service.getRoles().subscribe(data => {
      this.entities = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }

}
