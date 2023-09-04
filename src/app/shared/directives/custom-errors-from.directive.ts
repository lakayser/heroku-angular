import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customErrorsForm]',
  standalone: true
})
export class CustomErrorsFormDirective {

  private el      : ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorsMessage();
  };

  public setErrorsMessage(): void {
    if(!this.el) return;
    if(!this._errors) {
      this.el.nativeElement.innerText = '';
      return;
    };

    const errors: string[] = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.el.nativeElement.innerText = 'Este campo es requerido';
      return;
    };

    if(errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.el.nativeElement.innerText = `Minimo ${current}/${min} caracteres`;
      return;
    };

    if(errors.includes('pattern')) {
      this.el.nativeElement.innerText = 'No tiene formato de correo';
      return;
    };
  };

};