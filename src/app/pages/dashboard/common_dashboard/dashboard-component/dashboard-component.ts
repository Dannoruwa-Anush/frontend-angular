import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserRoleEnum } from '../../../../shared/enums/UserRoleEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {

  role!: UserRoleEnum;
  menuItems: { label: string; route: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TEMP: get role from storage (replace with AuthService later)
    this.role = (sessionStorage.getItem('role') as UserRoleEnum) || UserRoleEnum.CUSTOMER;

    this.loadMenu();
  }

  loadMenu() {
    if (this.role === UserRoleEnum.ADMIN) {
      this.menuItems = [
        { label: 'Dashboard', route: 'home' },
        { label: 'Users', route: 'users' },
        { label: 'Products', route: 'products' }
      ];
    }

    if (this.role === UserRoleEnum.EMPLOYEE) {
      this.menuItems = [
        { label: 'Dashboard', route: 'home' },
        { label: 'Orders', route: 'orders' }
      ];
    }

    if (this.role === UserRoleEnum.CUSTOMER) {
      this.menuItems = [
        { label: 'Dashboard', route: 'home' },
        { label: 'My Orders', route: 'my-orders' },
        { label: 'Profile', route: 'profile' }
      ];
    }
  }

  navigate(route: string) {
    this.router.navigate(['/dashboard', route]);
  }
}
