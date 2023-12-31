import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector   : 'dashboard-index-page',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './index-page.component.html',
  styles     : [
  ],
})
export default class IndexPageComponent implements OnInit {

  private authService: AuthService = inject(AuthService);

  public idOrg = computed(() => {
    return this.authService.currentUser()?.organization;
  });
  public user = computed(() => this.authService.currentUser());

  ngOnInit(): void {
    this.setIdOrgLocalStorage();
  };

  setIdOrgLocalStorage(): void {
    localStorage.setItem('idOrg', this.idOrg()!);
  };

};