import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EncuestaComponent,  } from './encuesta.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaRoutingModule } from './encuesta-routing.module';




@NgModule({
  declarations: [
    EncuestaComponent,

  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule

  ]
})
export class EncuestaModule { }
