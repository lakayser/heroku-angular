import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarRoutes } from '../../interfaces/toolbar-items.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector   : 'shared-toolbar',
  standalone : true,
  imports    : [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styles     : [
  ],
})
export class ToolbarComponent {

  @Input() toolbarRoutes: ToolbarRoutes[] = [];

  public isMenuOpen: boolean = false;

  toggleMenu():void {
    this.isMenuOpen= !this.isMenuOpen;
  };

};