import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CourtsService } from 'src/app/shared/services/courts-service.service';
import { Courts } from 'src/app/shared/interfaces/courts.interface';

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

  public courts = signal<Courts[]>([])
  public courtsName = computed<Courts[]>(()=> this.courts())

  public organization = computed(()=>{
    return localStorage.getItem("idOrg");
  })


  ngOnInit(): void {
    this.getcourts();
  }
  
  getcourts(): void{
    this.courtservice.getCourts(this.organization())
      .subscribe(courts=>{
        this.courts.set(courts)
        console.log(this.courts());
      })
  }

  getidOrg(): void{

  }

}
