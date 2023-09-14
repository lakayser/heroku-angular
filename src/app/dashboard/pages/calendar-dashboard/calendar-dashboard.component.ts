import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarHeaderComponent } from '../../../shared/components/calendar-header/calendar-header.component';
import { CourtsService } from '../../../shared/services/courts-service.service';
import { Courts } from '../../../shared/interfaces/courts.interface';
import { HoursService } from '../../../shared/services/hours.service';
import { CalendarDaysComponent } from '../../../shared/components/calendar-days/calendar-days.component';
import { CalendarHoursComponent } from '../../../shared/components/calendar-hours/calendar-hours.component';
import { Hours } from '../../../shared/interfaces/hours.interface';

@Component({
  selector: 'dashboard-calendar-dashboard',
  standalone : true,
  imports    : [
    CommonModule,
    CalendarHeaderComponent,
    CalendarDaysComponent,
    CalendarHoursComponent],
  templateUrl: './calendar-dashboard.component.html',
  styles     : [
  ],
})
export default class CalendarDashboardComponent implements OnInit {

  private courtsService: CourtsService = inject(CourtsService);
  private hoursService : HoursService  = inject(HoursService);
  private idOrg = computed(() => localStorage.getItem('idOrg'));

  public courts          = signal<Courts[]>([]);
  public idCourt         = signal<string>('');
  public idCourtComputed = computed<string>(() => this.idCourt());

  public year               = signal<number   | undefined>(undefined);
  public yearComputed       = computed(() => this.year());
  public weekNumber         = signal<number | undefined>(undefined);
  public weekNumberComputed = computed(() => this.weekNumber());
  public hours              = signal<Hours[]>([]);
  public hoursEffect   = effect(() => {
    if(this.idCourtComputed())
      this.getHours(this.idCourtComputed(), this.weekNumberComputed()!);
  });

  ngOnInit(): void {
    this.getCourts();
  };

  getCourts(): void {
    this.courtsService.getCourts(this.idOrg())
      .subscribe(courts => {
        this.courts.set(courts);
        this.idCourt.set(courts[0]._id)
      });
  };

  getHours(idCourt: string, weekNumber: number): void {
    this.hoursService.getHours(this.idOrg(), idCourt, weekNumber)
      .subscribe(hours => {
        this.hours.set(hours);
      });
  };

};