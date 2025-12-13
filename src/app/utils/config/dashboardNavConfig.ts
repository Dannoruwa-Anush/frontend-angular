import { Type } from '@angular/core';
import { ProfileComponent } from '../../pages/dashboard/commonLoadableComponents/profile-component/profile-component';

export interface DashboardNavItem {
    label: string;
    route: string;
    icon: string;         // material icon name
    component: Type<any>;
    roles: string[];      // allowed roles
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [ 
    { label: 'Profile', route: 'profile', icon: 'person', component: ProfileComponent, roles: ['Admin', 'Employee', 'Customer'] },
    
    /* 
    { label: 'Employees', route: 'employees', icon: 'group', component: UsersComponent, roles: ['Admin'] },
    { label: 'Products', route: 'products', icon: 'inventory_2', component: ProductsComponent, roles: ['Admin', 'Employee'] },
    { label: 'Orders', route: 'orders', icon: 'list_alt', component: OrdersComponent, roles: ['Admin', 'Employee'] },
    { label: 'My Orders', route: 'my-orders', icon: 'shopping_bag', component: MyOrdersComponent, roles: ['Customer'] }
     */
];
