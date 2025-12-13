import { Routes } from '@angular/router';
import { DashboardComponent } from './common_dashboard/dashboard-component/dashboard-component';
import { AuthGuard } from '../../utils/authGuard/authGuard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // protect dashboard
    data: { roles: ['Admin', 'Employee'] }, // allowed roles
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
