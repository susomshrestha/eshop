import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';

  constructor() {}

  ngOnInit(): void {}
}
