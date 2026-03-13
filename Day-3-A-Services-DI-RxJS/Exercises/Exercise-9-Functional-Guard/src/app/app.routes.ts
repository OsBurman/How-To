import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// TODO Step 3: Uncomment this import once you've implemented auth.guard.ts
// import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent
    // TODO Step 3: Add canActivate: [authGuard] to protect this route.
    // canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
