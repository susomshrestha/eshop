import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  slides = [
    { img: 'angela-bailey-jlo7Bf4tUoY-unsplashs.jpg' },
    { img: 'engin-akyurt-5raPrOhbKQo-unsplash.jpg' },
    { img: 'engin-akyurt-oXYGKCYhQOI-unsplash.jpg' },
    { img: 'matt-moloney-5NPId7L1_p4-unsplash.jpg' },
    { img: 'ryan-hoffman-A7f7XRKgUWc-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'engin-akyurt-TDOClniEwmI-unsplash.jpg' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
