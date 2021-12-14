import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  paginationMeta: any = {
    perPageItem: 10,
    totalItem: 100,
    currentPage: 3,
    totalPage: 10,
  };

  slides = [
    // { img: 'angela-bailey-jlo7Bf4tUoY-unsplashs.jpg' },
    // { img: 'engin-akyurt-5raPrOhbKQo-unsplash.jpg' },
    // { img: 'engin-akyurt-oXYGKCYhQOI-unsplash.jpg' },
    // { img: 'matt-moloney-5NPId7L1_p4-unsplash.jpg' },
    // { img: 'ryan-hoffman-A7f7XRKgUWc-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    // { img: 'engin-akyurt-TDOClniEwmI-unsplash.jpg' },
    // { img: 'angela-bailey-jlo7Bf4tUoY-unsplashs.jpg' },
    // { img: 'engin-akyurt-5raPrOhbKQo-unsplash.jpg' },
    // { img: 'engin-akyurt-oXYGKCYhQOI-unsplash.jpg' },
    // { img: 'matt-moloney-5NPId7L1_p4-unsplash.jpg' },
    // { img: 'ryan-hoffman-A7f7XRKgUWc-unsplash.jpg' },
    // { img: 'anomaly-WWesmHEgXDs-unsplash.jpg' },
    // { img: 'engin-akyurt-TDOClniEwmI-unsplash.jpg' },
  ];

  constructor() {}

  ngOnInit(): void {}

  pageChange(e: any) {
    this.paginationMeta.currentPage = e.data;
  }
}
