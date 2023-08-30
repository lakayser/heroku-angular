import { Routes } from '@angular/router';

export const routesDashboard: Routes = [

  {
    path         : '',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component'),
    children     : [
      {path: 'index', loadComponent: () => import('./pages/index-page/index-page.component')},
      {path: 'hours', loadComponent: () => import('./pages/hours/hours.component')},
    ],
  },

];