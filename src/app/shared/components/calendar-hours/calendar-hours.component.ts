import { Component, Input, OnInit, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hours, HoursColor } from '../../interfaces/hours.interface';

@Component({
  selector   : 'shared-calendar-hours',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './calendar-hours.component.html',
  styles     : [
  ],
})
export class CalendarHoursComponent {

  @Input()
  public hours = signal<Hours[]>([]);

  @Input()
  public weekNumber?: Signal<number | undefined>;

  public hoursComputed = computed(() => {
    const allHours = this.hours();
    const result = [];

    for(let day = 1; day <= 7; day++) {
      const hoursForDay = allHours.filter(hour => hour.day === day);
      result.push({
        day,
        hours: hoursForDay
      });
    };
    return result;
  });

  public loading = signal<boolean>(false);

  getHoursByColor(hour: Hours): HoursColor{
    if(hour.scheduled)
      return HoursColor.red;

    return HoursColor.green;
  };

};