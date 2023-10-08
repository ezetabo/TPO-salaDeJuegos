import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    PrimeNgModule,
  ]

})
export class PagesModule { }
