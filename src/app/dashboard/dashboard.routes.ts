import { Routes } from '@angular/router';

export const routesDashboard: Routes = [

  {
    path         : '',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component'),
    children     : [

      {path: 'index', loadComponent   : () => import('./pages/index-page/index-page.component')},
      {path: 'courts',        loadComponent: () => import('./pages/courts/courts.component')},
      {path: 'hours', loadComponent   : () => import('./pages/hours/hours.component')},
      {path: 'calendar', loadComponent: () => import('./pages/calendar-dashboard/calendar-dashboard.component')},
    ],
  },

];