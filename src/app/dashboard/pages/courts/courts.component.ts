import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CourtsService } from 'src/app/shared/services/courts-service.service';
import { Courts } from 'src/app/shared/interfaces/courts.interface';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

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



export default class CourtsComponent implements OnInit {

  private courtservice: CourtsService = inject(CourtsService);
  private auth: AuthService = inject(AuthService);

  public courts = signal<Courts[]>([])
  public organization = computed(()=>{
    return this.auth.currentUser();
  })
  

  ngOnInit(): void {

  }
  
  getidOrg(): void{

  }

}
