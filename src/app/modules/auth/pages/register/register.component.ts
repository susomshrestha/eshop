import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { PasswordMatchValidator } from '../../validator/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  success: Boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      const data = {
        name: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.authService.register(data).subscribe((res: any) => {
        if (res.success) {
          this.success = true;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
