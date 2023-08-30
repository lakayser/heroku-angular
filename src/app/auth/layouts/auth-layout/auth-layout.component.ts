import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector   : 'auth-layout',
  standalone : true,
  imports    : [CommonModule, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styles     : [
  ],
})
export default class AuthLayoutComponent {
};