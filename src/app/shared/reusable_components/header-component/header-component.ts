import { Component } from '@angular/core';

import { MaterialModule } from '../../material/material-module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/common/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
