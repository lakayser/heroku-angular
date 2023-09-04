import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarRoutes } from '../../interfaces/sidebar-items.interface';


@Component({
  selector   : 'shared-sidebar-dashboard',
  standalone : true,
  imports    : [CommonModule, RouterModule],
  templateUrl: './sidebar-dashboard.component.html',
  styles     : [
  ],
})
export class SidebarSharedComponent {

  @Input() sidebarRoutes: SidebarRoutes[] = [];

};