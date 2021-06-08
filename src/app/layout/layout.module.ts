import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

const PRIVATE_COMPONENTS = [
];

const PUBLIC_COMPONENTS = [
  NavbarComponent
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatToolbarModule,
    RouterModule
  ],
  exports: [
    ...PUBLIC_COMPONENTS
  ]
})
export class LayoutModule { }
