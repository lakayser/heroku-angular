import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderCalendarComponent } from '../../../shared/components/header-calendar/header-calendar.component';
import { DaysCalendarComponent } from '../../../shared/components/days-calendar/days-calendar.component';
import { HoursCalendarComponent } from '../../../shared/components/hours-calendar/hours-calendar.component';

@Component({
  selector: 'app-calendar-admin',
  standalone : true,
  imports    : [
    CommonModule,
    HeaderCalendarComponent,
    DaysCalendarComponent,
    HoursCalendarComponent],
  templateUrl: './calendar-admin.component.html',
  styles     : [
  ],
})
export default class CalendarAdminComponent {

  public weekNumber   = signal<number>(0);
  public year         = signal<number>(0);

  public idCourt       = signal<string>('');
  public idFirtstCourt = signal<string>('');

  getWeekNumber(numberWeek: number): void {
    this.weekNumber.set(numberWeek);
  };
  getYear(numberYear: number): void {
    this.year.set(numberYear);
  };

  getIdCourt(id: string): void {
    this.idCourt.set(id);
  };
  getIdFirstCourt(id: string): void {
    this.idFirtstCourt.set(id);
  };

};