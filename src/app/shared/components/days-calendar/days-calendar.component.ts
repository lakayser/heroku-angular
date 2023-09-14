import { Component, Input, OnInit, WritableSignal, computed, signal } from '@angular/core';
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
export class DaysCalendarComponent implements OnInit {

  @Input()
  public weekNumber!: WritableSignal<number>;

  @Input()
  public year!: WritableSignal<number>;

  public currentDate = signal<DateTime|undefined>(undefined);
  public daysWeek = computed(() => {
    const dateStartWeek = DateTime.now().set({weekYear: this.year(), weekNumber: this.weekNumber(), weekday: 1});
    const weekDays: {name: string, date: string}[] = [];

    for(let index = 0; index < 7; index++) {
      weekDays.push({
        name: dateStartWeek.plus({days: index}).toFormat('EEEE'),
        date: dateStartWeek.plus({days: index}).toFormat('dd'),
      });
    };
    return weekDays;
  });

  ngOnInit(): void {
    this.getCurrentDate();
  };

  getCurrentDate(): void {
    const currentDate = DateTime.now();
    this.currentDate.set(currentDate);
  };

};