import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public namePattern: string = '([a-zA-Z ]+)';
  public numberPattern: string = '^[0-9]+$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}";
  public telPattern: string = '^[0-9]{6,10}$';

  constructor() { }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isValidType(allowedTypes: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && allowedTypes.indexOf(value) === -1) {
        return { 'tipoInvalido': { value: control.value } };
      }
      return null;
    };
  }


  public integerValidator(): Validators {
    return Validators.pattern(this.numberPattern);
  }


  public telValidator(): Validators {
    return Validators.pattern(this.telPattern);
  }
}
