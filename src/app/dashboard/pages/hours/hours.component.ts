import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonDirective } from 'src/app/shared/directives/custom-button.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



import { CourtsService } from '../../../shared/services/courts-service.service';
import { Courts } from '../../../shared/interfaces/courts.interface';
import { Hours } from '../../../shared/interfaces/hours.interface';
import { HoursService } from '../../../shared/services/hours.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import Swal from 'sweetalert2';
import { CustomErrorsFormDirective } from 'src/app/shared/directives/custom-errors-from.directive';

@Component({
  selector   : 'dashboard-hours',
  standalone : true,
  imports    : [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule,
    CustomErrorsFormDirective
  ],
  templateUrl: './hours.component.html',
  styles     : [
  ],
})



export default class HoursComponent implements OnInit {

  private courtsService: CourtsService = inject(CourtsService);
  private hoursService : HoursService  = inject(HoursService);
  private idOrg = computed(() => localStorage.getItem('idOrg'));
  private fb: FormBuilder = inject(FormBuilder);
  private validatorsService: ValidatorsService = inject(ValidatorsService);


  public courts          = signal<Courts[]>([]);
  public idCourt         = signal<string>('');
  public courtsName = computed<Courts[]>(()=> this.courts())

  public formHours: FormGroup = this.fb.group({
    idCourt: ['', [Validators.required]],
    startHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    range: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getCourts();
  }

  getCourts(): void {
    this.courtsService.getCourts(this.idOrg())
      .subscribe(courts => {
        this.courts.set(courts);
        this.idCourt.set(courts[0]._id)
      });
  };

  isValidField(field: string): boolean|null {
    return this.validatorsService.isValidField(this.formHours, field);
  };

  submit():void{
    if(this.formHours.invalid){
      this.formHours.markAllAsTouched()
      return
    };
    const {startHours} = this.formHours.value;
    const {endHour} = this.formHours.value;
    const {range} = this.formHours.value;
    const {idCourt} = this.formHours.value;
    const {price} = this.formHours.value;
    console.log(this.formHours.value)
    this.hoursService.postHours(startHours, endHour, range, idCourt, price)
      .subscribe({
        next : () => {
          Swal.fire({
            title     : 'Creado',
            text      : `Horas creadas con exito!`,
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
};