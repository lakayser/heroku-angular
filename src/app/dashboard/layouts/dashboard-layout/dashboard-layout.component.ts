import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarRoutes } from '../../../shared/interfaces/sidebar-items.interface';
import { SidebarSharedComponent } from '../../../shared/components/sidebar/sidebar-dashboard.component';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { ToolbarRoutes } from '../../../shared/interfaces/toolbar-items.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces';

@Component({
  standalone : true,
  imports    : [
    CommonModule,
    RouterOutlet,
    SidebarSharedComponent,
    ToolbarComponent],
  templateUrl: './dashboard-layout.component.html',
  styles     : [
  ],
})
export default class DashboardLayoutComponent {

  private authService: AuthService = inject(AuthService);

  public sidebarRoutes: SidebarRoutes[] = [
    {label: 'Inicio', URL    : '/dashboard/index'},
    {label: 'Calendario', URL: '/dashboard/calendar'},
  ];

  public toolbarRoutes: ToolbarRoutes[] = [
    {label: 'Inicio', URL    : '/dashboard/index'},
    {label: 'Calendario', URL: '/dashboard/calendar'},
  ];

};