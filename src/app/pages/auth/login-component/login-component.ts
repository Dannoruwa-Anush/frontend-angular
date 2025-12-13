import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material-module';

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

  constructor(private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    // TODO: call backend API
    console.log('Login:', this.email, this.password);

    alert('Login successful');
    this.router.navigate(['/']);
  }
}
