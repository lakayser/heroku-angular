import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime, Settings } from 'luxon';

import { CourtsService } from '../../services/courts-service.service';
import { Courts } from '../../interfaces/courts.interface';

@Component({
  selector   : 'shared-header-calendar',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './header-calendar.component.html',
  styles     : [
  ],
})
export class HeaderCalendarComponent implements OnInit {

  private courtsService: CourtsService = inject(CourtsService);
  private idOrg                        = computed(() => localStorage.getItem('idOrg'));

  public courts         = signal<Courts[]>([]);
  public courtsName     = computed<Courts[]>(() => this.courts());
  public indexCourt     = signal<number>(0);
  public firstCourtName = computed<string>(() => this.courtsName()[this.indexCourt()]?.name);
  public showListCourts = signal<boolean>(false);

  public weekNumber       = signal<number|undefined>(undefined);
  public currentDate      = signal<DateTime|undefined>(undefined);
  public monthName        = signal<string|undefined>(undefined);
  public year             = signal<number|undefined>(undefined);
  public monthNameAndYear = computed(() => `${this.monthName()} ${this.year()}`);

  constructor() {
    Settings.defaultZone   = 'America/Santiago';
    Settings.defaultLocale = 'es';
  };

  ngOnInit(): void {
    this.getCourts();

    this.getCurrentDate();
    this.getWeekNumber();
    this.getMonthName(this.weekNumber(), this.year());
    this.getCurrentYear();
  };

  getCourts(): void {
    this.courtsService.getCourts(this.idOrg())
      .subscribe(courts => {
        this.courts.set(courts);
      });
  };
  setShowListCourts(): void {
    this.showListCourts.update(show => show = !show);
  };
  getIndexCourtList(indexCourt: number): void {
    this.indexCourt.update(index => index = indexCourt);
    this.showListCourts.update(show => show = !show);
  };

  getCurrentDate(): void {
    const currentDate = DateTime.now();
    this.currentDate.set(currentDate);
  };
  getWeekNumber(): void {
    this.weekNumber.set(this.currentDate()?.weekNumber);
  };
  getMonthName(weekNumber: number|undefined, year: number|undefined): void {
    if(this.weekNumber()! >= 1 && this.weekNumber()! <= 52) {
      const date = DateTime.fromObject({weekNumber: this.weekNumber(), weekday: 1})
      this.monthName.set(date.toFormat('LLLL'));
    };
  };
  getCurrentYear(): void {
    this.year.set(this.currentDate()?.year);
  };
  nextWeek(): void {
    if(this.weekNumber()! >= 52) {
      this.weekNumber.set(1);
      this.year.update(year => year! + 1);
    };
    this.weekNumber.update(number => number! + 1);
    this.getMonthName(this.weekNumber(), this.year());
  };
  prevWeek(): void {
    if(this.weekNumber()! <= 1) {
      this.weekNumber.set(52);
      this.year.update(year => year! - 1);
    };
    this.weekNumber.update(number => number! - 1);
    this.getMonthName(this.weekNumber(), this.year());
  };

};