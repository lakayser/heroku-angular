import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector   : 'dashboard-hours',
  standalone : true,
  imports    : [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './hours.component.html',
  styles     : [
  ],
})



export default class HoursComponent {
};