import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.authService.login().subscribe((res: any) => {
      console.log(res);
    });
  }

  logout(): void {
    this.authService.logout();
    this.authService.getUser().subscribe((resUser: any) => {
      console.log(resUser);
    });
  }
}
