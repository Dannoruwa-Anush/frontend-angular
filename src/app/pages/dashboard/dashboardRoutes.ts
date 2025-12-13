import { Routes } from '@angular/router';
import { DashboardComponent } from './common_dashboard/dashboard-component/dashboard-component';
import { AuthGuard } from '../../utils/authGuard/authGuard';
import { DASHBOARD_NAV_ITEMS } from '../../utils/config/dashboardNavConfig';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Employee', 'Customer'] },
    children: [
      ...DASHBOARD_NAV_ITEMS.map(item => ({
        path: item.route,
        component: item.component,
        canActivate: [AuthGuard],
        data: { roles: item.roles }
      })),
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];
