import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  slideItems = [
    'angela-bailey-jlo7Bf4tUoY-unsplash.jpg',
    'bilyana-slaveykova--ULJ7-be8Rc-unsplash.jpg',
    'parker-burchfield-tvG4WvjgsEY-unsplash.jpg',
  ];

  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {}

  changeSlide(increase: true): void {
    if (increase) {
      this.currentSlide++;
    } else {
      this.currentSlide--;
    }

    if (this.currentSlide >= this.slideItems.length) {
      this.currentSlide = 0;
    }
    if (this.currentSlide < 0) {
      this.currentSlide = this.slideItems.length - 1;
    }
  }
}
