import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';
import { HeaderCalendarComponent } from '../../../shared/components/header-calendar/header-calendar.component';
import { DaysCalendarComponent } from '../../../shared/components/days-calendar/days-calendar.component';

@Component({
  selector   : 'dashboard-index-page',
  standalone : true,
  imports    : [
    CommonModule,
    HeaderCalendarComponent,
    DaysCalendarComponent],
  templateUrl: './index-page.component.html',
  styles     : [
  ],
})
export default class IndexPageComponent implements OnInit {

  @Input() idOrg!: string;

  private authService: AuthService = inject(AuthService);

  public org = computed(() => {
    return this.authService.currentUser();
  });
  public user = computed(() => this.authService.currentUser());

  ngOnInit(): void {
    this.setIdOrgLocalStorage();
  };

  setIdOrgLocalStorage(): void {
    localStorage.setItem('idOrg', this.idOrg);
  };

};