import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './shop.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    ShopComponent,
    FooterComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
