import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { CourtsService } from 'src/app/shared/services/courts-service.service';
import { Courts } from 'src/app/shared/interfaces/courts.interface';
import { ValidatorsService } from '../../../shared/services/validators.service';
import Swal from 'sweetalert2';
import { CustomErrorsFormDirective } from 'src/app/shared/directives/custom-errors-from.directive';


@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule,
    CustomErrorsFormDirective
  ],
  templateUrl: './courts.component.html',
  styleUrls: [

  ]
})


export default class CourtsComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  private courtservice: CourtsService = inject(CourtsService);
  private validatorsService: ValidatorsService = inject(ValidatorsService);

  public courts = signal<Courts[]>([])
  public courtsName = computed<Courts[]>(()=> this.courts())


  public organization = computed(()=>{
    return localStorage.getItem("idOrg");
  })

  public formCourts: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]]
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

  isValidField(field: string): boolean|null {
    return this.validatorsService.isValidField(this.formCourts, field);
  };

  submit():void{
    if(this.formCourts.invalid){
      this.formCourts.markAllAsTouched()
      return
    };
    const {name} = this.formCourts.value;
    this.courtservice.postCourts(name)
      .subscribe({
        next : () => {
          Swal.fire({
            title     : 'Creado',
            text      : `Cancha ${name} creada con exito!`,
            color     : 'white',
            icon      : 'success',
            background: '#4a5568',
            backdrop  : true,
          });
        },
        error : (msg) =>{
          Swal.fire({
            title     : 'Error',
            text      : msg,
            color     : 'white',
            icon      : 'error',
            background: '#4a5568',
            backdrop  : true,
          });
        }
      })
  }

}
