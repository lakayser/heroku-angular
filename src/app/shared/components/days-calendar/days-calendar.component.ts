import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'shared-days-calendar',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './days-calendar.component.html',
  styles     : [
  ],
})
export class DaysCalendarComponent {

  public days = signal<string[]>([
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
  ]);
  public dayWithDate  = signal(this.days().map((day, index) => {
    const currentDate = DateTime.now();
    const dayOfWeek   = (index + 1) % 7;
    const dateForDay  = currentDate.set({weekday: dayOfWeek});
    const weekNumber  = dateForDay.weekNumber;
    return {
      day,
      date: dateForDay.toLocaleString(),
      weekNumber,
    }
  }));

};