import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.authToken) {
        this.activateAccount(params.authToken);
      }
    });
  }

  activateAccount(token: string): void {
    this.authService.activate(token).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/auth/login']);
    });
  }
}
