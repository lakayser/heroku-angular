import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  };

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl<any, any>): ValidationErrors | null => {
      const fieldValueOne: string = formGroup.get(field1)?.value;
      const fieldValueTwo: string = formGroup.get(field2)?.value;

      if(fieldValueOne !== fieldValueTwo) {
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true};
      };

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  };

};