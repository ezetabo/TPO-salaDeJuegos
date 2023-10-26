import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'ahorcado',
        loadChildren: () => import('../juegos/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
      },
      {
        path: 'preguntados',
        loadChildren: () => import('../juegos/preguntados/preguntados.module').then(m => m.PreguntadosModule)
      },
      {
        path: 'mayor',
        loadChildren: () => import('../juegos/mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)
      },
      {
        path: 'propio',
        loadChildren: () => import('../juegos/propio/propio.module').then(m => m.PropioModule)
      },
      {
        path: 'encuesta',
        loadChildren: () => import('./encuesta/encuesta.module').then(m => m.EncuestaModule)
      },
      {
        path: '**',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
