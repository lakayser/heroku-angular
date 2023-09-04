import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { CustomButtonDirective } from '../../../shared/directives/custom-button.directive';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { CustomErrorsFormDirective } from '../../../shared/directives/custom-errors-from.directive';
import { Router } from '@angular/router';

@Component({
  selector   : 'auth-login-page',
  standalone : true,
  imports    : [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule,
    CustomErrorsFormDirective,
  ],
  templateUrl: './login-page.component.html',
  styles     : [
    `
      section {
        background: transparent url('../../../../assets/imgs/paddle-tennis.jpg') 0% 0% no-repeat padding-box;
      }
      .bodyForm {
        box-shadow: 0px 0px 14px #000000;
        border-radius: 14px;
      }
    `
  ],
})
export default class LoginPageComponent implements OnInit {

  private fb               : FormBuilder = inject(FormBuilder);
  private router           : Router = inject(Router);
  private validatorsService: ValidatorsService = inject(ValidatorsService);
  private authService      : AuthService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email   : ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
  };

  isValidField(field: string): boolean|null {
    return this.validatorsService.isValidField(this.myForm, field);
  };

  login(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };
    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next : () => this.router.navigateByUrl('dashboard/index'),
        error: (message) => {
          Swal.fire({
            title     : 'Error',
            text      : message,
            color     : 'white',
            icon      : 'error',
            background: '#4a5568',
            backdrop  : true,
          });
        },
      })
  };

};