import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    // Mark the user as logged out, then navigate back to login.
    // If the user tries to return to /dashboard, the guard will redirect them.
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
