import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NameContainsPipe } from './name-contains.pipe';

import { TimerComponent } from './timer/timer.component';

const MODULES = [
  CommonModule,
  NgbModule
]

const PRIVATE_COMPONENTS = [
];

const PUBLIC_COMPONENTS = [
  TimerComponent,
  NameContainsPipe
]

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS
  ],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ]
})
export class SharedModule { }
