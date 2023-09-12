import { Routes } from '@angular/router';

export const routesDashboard: Routes = [

  {
    path         : '',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component'),
    children     : [
      {path: 'index/:idOrg',  loadComponent: () => import('./pages/index-page/index-page.component')},
      {path: 'hours',         loadComponent: () => import('./pages/hours/hours.component')},
      {path: 'courts/:idOrg',        loadComponent: () => import('./pages/courts/courts.component')}
    ],
  },

];