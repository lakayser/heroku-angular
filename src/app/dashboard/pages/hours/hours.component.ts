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

  public options = signal<number[]>([1, 2, 3]);

  public formHours: FormGroup = this.fb.group({
    idCourt: ['65008b7ad74bbeb519113f47', [Validators.required]],
    startHour: ['10:00', [Validators.required]],
    endHour: ['20:00', [Validators.required]],
    price: [100, [Validators.required, Validators.minLength(1)]],
    range: [1, [Validators.required]]
  })

  ngOnInit(): void {
    console.log(this.formHours.value);
    this.getCourts();
  };

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
    console.log(this.formHours.value)
    const {startHour, endHour, range, idCourt, price} = this.formHours.value;
    this.hoursService.postHours(startHour, endHour, range, idCourt, price)
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