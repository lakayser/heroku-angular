import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

}
