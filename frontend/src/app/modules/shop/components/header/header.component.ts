import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('stickyMenu') headerEle!: ElementRef;

  headerHeight: Number = 0;

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= this.headerHeight;
  }

  constructor() {}

  ngAfterViewInit() {
    this.headerHeight = this.headerEle.nativeElement.offsetHeight;
  }

  ngOnInit(): void {}
}
