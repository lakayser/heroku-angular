import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './courts.component.html',
  styleUrls: [

  ]
})
export default class CourtsComponent {

}
