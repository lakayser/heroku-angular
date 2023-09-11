import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';
import { HeaderCalendarComponent } from '../../../shared/components/header-calendar/header-calendar.component';

@Component({
  selector   : 'dashboard-index-page',
  standalone : true,
  imports    : [CommonModule, HeaderCalendarComponent],
  templateUrl: './index-page.component.html',
  styles     : [
  ],
})
export default class IndexPageComponent {

  @Input() idOrg!: string;

  private authService: AuthService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

};