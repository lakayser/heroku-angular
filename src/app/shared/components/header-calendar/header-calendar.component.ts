import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtsService } from '../../services/courts-service.service';
import { Courts } from '../../interfaces/courts.interface';
import { DateTime, Settings } from 'luxon';

@Component({
  selector   : 'shared-header-calendar',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './header-calendar.component.html',
  styles     : [
  ],
})
export class HeaderCalendarComponent implements OnInit {

  @Input() idOrg!: string;

  private courtsService: CourtsService = inject(CourtsService);

  public courts     = signal<Courts[]>([]);
  public indexCourt = signal<number>(0);
  public courtsName = computed(() => {
    return this.courts()[this.indexCourt()]?.name;
  });

  public weekNumber  = signal<number|undefined>(undefined);
  public currentDate = signal<DateTime|undefined>(undefined);
  public monthName   = signal<string|undefined>(undefined);
  public year        = signal<number|undefined>(undefined);

  constructor() {
    Settings.defaultZone   = 'America/Santiago';
    Settings.defaultLocale = 'es';
  };

  ngOnInit(): void {
    this.getCourts();

    this.getCurrentDate();
    this.getWeekNumber();
    this.getMonthName();
    this.getCurrentYear();
  };

  getCourts(): void {
    this.courtsService.getCourts(this.idOrg)
      .subscribe(courts => {
        this.courts.set(courts);
      });
  };

  getCurrentDate(): void {
    const currentDate = DateTime.now();
    this.currentDate.set(currentDate);
  };
  getWeekNumber(): void {
    this.weekNumber.set(this.currentDate()?.weekNumber);
  };
  getMonthName(): void {
    const startOfWeek = this.currentDate()?.startOf('week');
    this.monthName.set(startOfWeek?.toLocaleString({month:'long'}));
  };
  getCurrentYear(): void {
    this.year.set(this.currentDate()?.year);
  };

};