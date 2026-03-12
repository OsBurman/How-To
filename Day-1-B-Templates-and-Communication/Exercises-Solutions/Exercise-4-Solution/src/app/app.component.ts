import { Component } from '@angular/core';

// Interface for a user profile — note the optional properties
interface UserProfile {
  name: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    zip?: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Scenario 1: A fully loaded user — every property has a value
  fullUser: UserProfile = {
    name: 'Maria Santos',
    email: 'maria@example.com',
    address: {
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      zip: '62704'
    }
  };

  // Scenario 2: A partially loaded user — some fields are missing
  partialUser: UserProfile = {
    name: 'James Chen',
    // email is intentionally missing (undefined)
    address: {
      // street is intentionally missing (undefined)
      city: 'Portland'
      // zip is intentionally missing (undefined)
    }
  };

  // Scenario 3: No user at all — null (not logged in)
  noUser: UserProfile | null = null;
}
