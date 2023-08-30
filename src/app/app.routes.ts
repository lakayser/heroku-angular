import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path        : 'auth',
    // guards
    loadChildren: () => import('./auth/auth.routes').then(m => m.routesAuth),
  },
  {
    path        : 'dashboard',
    // guards
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.routesDashboard),
  },
  {
    path      : '**',
    redirectTo: 'auth',
  },

];