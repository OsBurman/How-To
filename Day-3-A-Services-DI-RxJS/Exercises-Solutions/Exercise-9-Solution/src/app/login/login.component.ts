import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login(): void {
    // Mark the user as logged in, then navigate programmatically to the dashboard.
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
