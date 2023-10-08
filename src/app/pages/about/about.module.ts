import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AboutComponent } from './about.component';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PrimeNgModule,
  ]
})
export class AboutModule { }
