import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<div class="slick-arrow arrow-left">&#8249;</div>',
    nextArrow: '<div class="slick-arrow arrow-right">&#8250;</div>',
  };

  slides = [
    { img: 'angela-bailey-jlo7Bf4tUoY-unsplashs.jpg' },
    { img: 'engin-akyurt-5raPrOhbKQo-unsplash.jpg' },
    { img: 'engin-akyurt-oXYGKCYhQOI-unsplash.jpg' },
    { img: 'matt-moloney-5NPId7L1_p4-unsplash.jpg' },
    { img: 'ryan-hoffman-A7f7XRKgUWc-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'engin-akyurt-TDOClniEwmI-unsplash.jpg' },
  ];

  mainImage: string = '';

  tabs: any = ['Description', 'Reviews'];

  currentTab: string = this.tabs[0];

  constructor() {}

  ngOnInit(): void {
    this.mainImage = this.slides[0].img;
  }

  afterChange(e: any) {
    console.log(e);
    console.log('afterChange');
  }

  changeImage(index: number) {
    this.mainImage = this.slides[index].img;
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }
}
