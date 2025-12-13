import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserRoleEnum } from '../../../../shared/enums/UserRoleEnum';
import { CommonModule } from '@angular/common';
import { DASHBOARD_NAV_ITEMS, DashboardNavItem } from '../../../../utils/config/dashboardNavConfig';
import { AuthService } from '../../../../core/services/common/authService';
import { MaterialModule } from '../../../../shared/material/material-module';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {

  navItems: DashboardNavItem[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const role = this.authService.getRole();
    // Filter items based on role
    this.navItems = DASHBOARD_NAV_ITEMS.filter(item => item.roles.includes(role!));
  }
}
