import { FormGroup } from '@angular/forms';

export function PasswordMatchValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.passwordMatchValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMatchValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
