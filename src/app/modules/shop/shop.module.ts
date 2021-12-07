import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './shop.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NgRatingBarModule } from 'ng-rating-bar';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    ShopComponent,
    FooterComponent,
    ProductDetailComponent,
    CategoryComponent,
    ProductSliderComponent,
    ProductItemComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SlickCarouselModule,
    NgRatingBarModule,
  ],
})
export class ShopModule {}
