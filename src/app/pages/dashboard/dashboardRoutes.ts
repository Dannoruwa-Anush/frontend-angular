import { Routes } from '@angular/router';
import { DashboardComponent } from './common_dashboard/dashboard-component/dashboard-component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
       /*
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
       */
    ]
  }
];
