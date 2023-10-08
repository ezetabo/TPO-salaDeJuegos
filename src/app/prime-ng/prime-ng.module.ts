import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ScrollerModule } from 'primeng/scroller';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  exports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    DividerModule,
    FieldsetModule,
    ImageModule,
    MenubarModule,
    MenuModule,
    PanelModule,
    ToastModule,
    ScrollerModule,
    ProgressSpinnerModule,
    ListboxModule

  ]
})
export class PrimeNgModule { }
