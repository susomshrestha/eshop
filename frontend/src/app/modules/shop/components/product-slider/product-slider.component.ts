import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  @Input() title: string = '';
  @Input() slides: any = [];
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<div class="slick-arrow arrow-left">&#8249;</div>',
    nextArrow: '<div class="slick-arrow arrow-right">&#8250;</div>',
  };

  constructor() {}

  ngOnInit(): void {}
}
