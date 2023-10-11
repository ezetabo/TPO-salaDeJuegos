import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropioRoutingModule } from './propio-routing.module';
import { PropioComponent } from './propio.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropioComponent
  ],
  imports: [
    CommonModule,
    PropioRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PropioModule { }
