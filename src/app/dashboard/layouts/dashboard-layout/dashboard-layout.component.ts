import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarRoutes } from '../../../shared/interfaces/sidebar-items.interface';
import { SidebarSharedComponent } from '../../../shared/components/sidebar/sidebar-dashboard.component';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { ToolbarRoutes } from '../../../shared/interfaces/toolbar-items.interface';

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

  public sidebarRoutes: SidebarRoutes[] = [
    {label: 'Inicio', URL: '/dashboard/index'},
  ];

  public toolbarRoutes: ToolbarRoutes[] = [
    {label: 'Inicio', URL: '/dashboard/index'},
  ];

};