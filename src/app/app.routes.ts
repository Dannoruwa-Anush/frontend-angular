import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/reusable_components/layout-component/layout-component';
import { HomeComponent } from './pages/home-component/home-component';
import { ProductsComponent } from './pages/products-component/products-component';
import { ProductComponent } from './pages/product-component/product-component';
import { ShoppingCartComponent } from './pages/shopping-cart-component/shopping-cart-component';

export const routes: Routes = [{
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'product/:id', component: ProductComponent },
            { path: 'cart', component: ShoppingCartComponent },
        ]
    }];
