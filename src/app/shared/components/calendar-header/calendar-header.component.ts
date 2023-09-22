import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime, Settings } from 'luxon';

import { Courts } from '../../interfaces/courts.interface';

@Component({
  selector: 'shared-calendar-header',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './calendar-header.component.html',
  styles     : [
  ],
})
export class CalendarHeaderComponent implements OnInit {

  @Input()
  public weekNumber       = signal<number   | undefined>(undefined);

  @Input() year           = signal<number   | undefined>(undefined);

  public currentDate      = signal<DateTime | undefined>(undefined);
  public monthName        = signal<string   | undefined>(undefined);
  public monthNameAndYear = computed<string>(() => `${this.monthName()} ${this.year()}`);

  @Input()
  public courts  = signal<Courts[]>([]);

  @Input()
  public idCourt = signal<string>('');

  public indexCourt       = signal<number>(0);
  public firstCourtName   = computed<string>(() => this.courts()[this.indexCourt()]?.name);
  public courtsName       = computed<Courts[]>(() => this.courts());
  public listCourts       = signal<boolean>(false);

  @Input()
  loading = signal<boolean>(false);

  constructor() {
    Settings.defaultZone   = 'America/Santiago';
    Settings.defaultLocale = 'es';
  };

  ngOnInit(): void {
    this.getCurrentDate();
    this.getWeekNumber();
    this.getYear();
    this.getMonthName(this.weekNumber(), this.year());
  };

  getCurrentDate(): void {
    const currentDate = DateTime.now();
    this.currentDate.set(currentDate);
  };
  getWeekNumber(): void {
    this.weekNumber.set(this.currentDate()?.weekNumber);
  };
  getYear(): void {
    this.year.set(this.currentDate()?.year);
  };
  getMonthName(weekNumber: number | undefined, year: number | undefined): void {
    if(this.weekNumber()! >= 1 && this.weekNumber()! <= 52) {
      const date = DateTime.fromObject({weekNumber: this.weekNumber(), weekday: 1})
      this.monthName.set(date.toFormat('LLLL'));
    };
  };
  getIdCourt(id: string, index: number): void {
    this.idCourt.update(courtId => courtId = id );
    this.listCourts.update(list => list = !list);
    this.indexCourt.set(index);
  };
  getIndexCourt(index: number): void {
    this.indexCourt.set(index);
  };

  showListCourts(): void {
    this.listCourts.update(list => list = !list);
  };
  nextWeek(): void {
    this.loading.update(load => load = false);
    if(this.weekNumber()! >= 52) {
      this.weekNumber.set(1);
      this.year.update(year => year! + 1);
    };
    this.weekNumber.update(number => number! + 1);
    this.getMonthName(this.weekNumber(), this.year());
    setTimeout(() => {
      this.loading.update(load => load = true);
    }, 1000)
  };
  prevWeek(): void {
    this.loading.update(load => load = false);
    if(this.weekNumber()! <= 1) {
      this.weekNumber.set(52);
      this.year.update(year => year! - 1);
    };
    this.weekNumber.update(number => number! - 1);
    this.getMonthName(this.weekNumber(), this.year());
    setTimeout(() => {
      this.loading.update(load => load = true);
    }, 1000)
  };

};