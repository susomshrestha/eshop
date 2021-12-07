import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
