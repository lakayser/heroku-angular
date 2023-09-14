import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hours } from '../../interfaces/hours.interface';

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

};