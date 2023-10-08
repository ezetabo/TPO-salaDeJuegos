import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayorMenorRoutingModule } from './mayor-menor-routing.module';
import { MayorMenorComponent } from './mayor-menor.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


@NgModule({
  declarations: [MayorMenorComponent],
  imports: [
    CommonModule,
    MayorMenorRoutingModule,
    PrimeNgModule
  ]
})
export class MayorMenorModule { }
