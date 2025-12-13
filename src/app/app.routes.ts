import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/reusable_components/layout-component/layout-component';
import { HomeComponent } from './pages/home-component/home-component';
import { ProductsComponent } from './pages/products-component/products-component';
import { ProductComponent } from './pages/product-component/product-component';
import { ShoppingCartComponent } from './pages/shopping-cart-component/shopping-cart-component';
import { LoginComponent } from './pages/auth/login-component/login-component';
import { RegisterComponent } from './pages/auth/register-component/register-component';
import { DASHBOARD_ROUTES } from './pages/dashboard/dashboardRoutes';

export const routes: Routes = [{
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'product/:id', component: ProductComponent },
            { path: 'cart', component: ShoppingCartComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },

            // Adding dashboard routes
            ...DASHBOARD_ROUTES,
        ]
    }];
