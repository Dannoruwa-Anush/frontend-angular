import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material-module';
import { AuthService } from '../../../core/services/common/authService';

@Component({
  selector: 'app-login-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  email = '';
  password = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  // -------------------------
  // Form Validation Function
  // -------------------------
  private validateForm(): boolean {
    if (!this.email || !this.password) {
      alert('Please fill all fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  }

  // -------------------------
  // Login Function
  // -------------------------
  login() {
    if (!this.validateForm()) return; // call validation

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (!res) {
          alert('Invalid email or password');
          return;
        }

        // Store session
        this.authService.setSession(res);

        // Role-based redirect
        switch (res.role) {
          case 'Admin':
          case 'Employee':
            this.router.navigate(['/dashboard']);
            break;
          case 'Customer':
            this.router.navigate(['/']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        alert('Login failed. Please try again later.');
        console.error('Login error:', err);
      }
    });
  }
}
