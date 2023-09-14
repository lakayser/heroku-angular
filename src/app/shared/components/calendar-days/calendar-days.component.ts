import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector   : 'shared-calendar-days',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './calendar-days.component.html',
  styles     : [
  ],
})
export class CalendarDaysComponent {

  @Input()
  public year        ?: Signal<number | undefined>;

  @Input()
  public weekNumber  ?: Signal<number | undefined>;

  public daysWeek = computed(() => {
    const dateStartWeek = DateTime.now().set({weekYear: this.year!(), weekNumber: this.weekNumber!(), weekday: 1});
    const weekDays: {name: string, date: string}[] = [];

    for(let index = 0; index < 7; index++) {
      weekDays.push({
        name: dateStartWeek.plus({days: index}).toFormat('EEEE'),
        date: dateStartWeek.plus({days: index}).toFormat('dd'),
      });
    };
    return weekDays;
  });

};