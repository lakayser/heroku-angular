import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomButtonDirective } from '../../../shared/directives/custom-button.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector   : 'auth-login-page',
  standalone : true,
  imports    : [
    CommonModule,
    CustomButtonDirective,
    ReactiveFormsModule
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
export default class LoginPageComponent {

  private fb               : FormBuilder = inject(FormBuilder);
  private validatorsService: ValidatorsService = inject(ValidatorsService);
  private authService      : AuthService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email   : ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login(): void {
    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
      .subscribe(success => {
        console.log({success});
      })
  };

};