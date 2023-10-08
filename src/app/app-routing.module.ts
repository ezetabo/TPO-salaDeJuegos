import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { NoAuthGuard } from './services/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'logueo',
    loadChildren: () => import('./logueo/logueo.module').then(m => m.LogueoModule),
    canActivate:[NoAuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./logueo/logueo.module').then(m => m.LogueoModule),
    canActivate:[NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
