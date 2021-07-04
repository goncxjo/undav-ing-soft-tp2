import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NameContainsPipe } from './name-contains.pipe';

import { TimerComponent } from './timer/timer.component';
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';
import { NgbModalYesNoComponent } from './ngb-modal-yes-no/ngb-modal-yes-no.component';

const MODULES = [
  CommonModule,
  NgbModule
]

const PRIVATE_COMPONENTS = [
];

const PUBLIC_COMPONENTS = [
  TimerComponent,
  DatepickerRangeComponent,
  NameContainsPipe,
  NgbModalYesNoComponent,
]

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  entryComponents: [NgbModalYesNoComponent],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ]
})
export class SharedModule { }
