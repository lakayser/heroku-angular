import { Component, Input, OnInit, computed, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursService } from '../../services/hours.service';
import { Hours } from '../../interfaces/hours.interface';

@Component({
  selector   : 'shared-hours-calendar',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './hours-calendar.component.html',
  styles     : [
  ],
})
export class HoursCalendarComponent implements OnInit {

  @Input()
  public courtId?: WritableSignal<string>;

  @Input()
  public idFirstCourt?: WritableSignal<string>;

  private hoursService: HoursService = inject(HoursService);

  public idOrg = computed(() => localStorage.getItem('idOrg'));
  public idCourt = computed(() => {
    if(!this.courtId!())
      return this.idFirstCourt!();

    return this.courtId!();
  });
  public hours = signal<Hours[]>([]);

  ngOnInit(): void {
    setTimeout(() => {
      this.getHours();
    }, 1500)
  };

  getHours(): void {
    this.hoursService.getHours(this.idOrg(), this.idCourt(), 37)
      .subscribe(hours => {
        this.hours.set(hours);
        console.log(this.hours());
      });
  };

};