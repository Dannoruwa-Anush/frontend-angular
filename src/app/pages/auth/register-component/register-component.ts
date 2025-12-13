import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material-module';

@Component({
  selector: 'app-register-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) { }

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: call backend API
    console.log('Register:', this.email, this.password);

    alert('Registration successful');
    this.router.navigate(['/login']);
  }
}
