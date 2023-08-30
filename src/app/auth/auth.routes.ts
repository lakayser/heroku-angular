import { Routes } from '@angular/router';

export const routesAuth: Routes = [

  {
    path         : '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component'),
    children     : [
      {path: 'login', loadComponent: () => import('./pages/login-page/login-page.component')},
      {path: '**', redirectTo: 'login'}
    ],
  },

];