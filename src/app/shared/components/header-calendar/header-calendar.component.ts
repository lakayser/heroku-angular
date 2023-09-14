import { Component, EventEmitter, OnInit, Output, computed, inject, signal } from '@angular/core';
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

  @Output()
  public onEmitWeekNumberAdd = new EventEmitter<number>();

  @Output()
  public onEmitWeekNumberSubstract = new EventEmitter<number>();

  @Output()
  public onEmitYear = new EventEmitter<number>();

  @Output()
  public onEmitIdCourt = new EventEmitter<string>();

  @Output()
  public onEmitIdFirstCourt = new EventEmitter<string>();

  private courtsService: CourtsService = inject(CourtsService);
  private idOrg                        = computed(() => localStorage.getItem('idOrg'));

  public courts         = signal<Courts[]>([]);
  public courtsName     = computed<Courts[]>(() => this.courts());
  public indexCourt     = signal<number>(0);
  public firstCourtName = computed<string>(() => this.courtsName()[this.indexCourt()]?.name);
  public showListCourts = signal<boolean>(false);
  public idCourt        = signal<string>('');

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
    setTimeout(() => {
      this.getIdFirstCourt();
    }, 1000)

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
  getIdCourt(id: string): void {
    this.idCourt.set(id);
    this.onEmitIdCourt.emit(this.idCourt());
  };
  getIdFirstCourt(): void {
    const idCourt = this.courts()[0]?._id;
    this.onEmitIdFirstCourt.emit(idCourt);
  };

  getCurrentDate(): void {
    const currentDate = DateTime.now();
    this.currentDate.set(currentDate);
  };
  getWeekNumber(): void {
    this.weekNumber.set(this.currentDate()?.weekNumber);
    this.onEmitWeekNumberAdd.emit(this.weekNumber());
  };
  getMonthName(weekNumber: number|undefined, year: number|undefined): void {
    if(this.weekNumber()! >= 1 && this.weekNumber()! <= 52) {
      const date = DateTime.fromObject({weekNumber: this.weekNumber(), weekday: 1})
      this.monthName.set(date.toFormat('LLLL'));
    };
  };
  getCurrentYear(): void {
    this.year.set(this.currentDate()?.year);
    this.onEmitYear.emit(this.year());
  };
  nextWeek(): void {
    if(this.weekNumber()! >= 52) {
      this.weekNumber.set(1);
      this.year.update(year => year! + 1);
      this.onEmitYear.emit(this.year());
    };
    this.weekNumber.update(number => number! + 1);
    this.getMonthName(this.weekNumber(), this.year());
    this.onEmitWeekNumberAdd.emit(this.weekNumber());
  };
  prevWeek(): void {
    if(this.weekNumber()! <= 1) {
      this.weekNumber.set(52);
      this.year.update(year => year! - 1);
      this.onEmitYear.emit(this.year());
    };
    this.weekNumber.update(number => number! - 1);
    this.getMonthName(this.weekNumber(), this.year());
    this.onEmitWeekNumberSubstract.emit(this.weekNumber());
  };

};