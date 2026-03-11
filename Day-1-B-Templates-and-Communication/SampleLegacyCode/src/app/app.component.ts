/**
 * legacy/app.component.ts — Root Component (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * KEY LEGACY DIFFERENCES:
 * - No standalone: true — components can't exist without a module.
 * - No imports: [] array — dependencies come from the NgModule, not the component.
 * - Uses styleUrls (plural array) instead of modern styleUrl (singular string).
 * - The component doesn't declare what it needs — it relies on AppModule to provide everything.
 *
 * PAIN POINT: You can't tell from this file alone which directives or
 * components are available in the template. You have to check app.module.ts.
 * Modern standalone components list their imports explicitly.
 */

import { Component } from '@angular/core';

// Interface for safe navigation demo — same as modern version.
// Interfaces are pure TypeScript — they work the same in both patterns.
interface User {
  name: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
}

@Component({
  // No standalone: true — this component MUST be in app.module.ts declarations.
  // If you forget to declare it, Angular throws "is not a known element."
  selector: 'app-root',
  templateUrl: './app.component.html',
  // LEGACY: styleUrls is a plural ARRAY of strings.
  // Modern equivalent: styleUrl (singular string): './app.component.css'
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Day 1 Part B — Templates & Communication (Legacy)';

  // Safe navigation demo — same data as modern version.
  // Template features like ?. and ?? are Angular features, not module-related.
  currentUser: User | null = {
    name: 'Emily',
    address: {
      city: 'Portland',
      state: 'OR'
    }
  };

  guestUser: User | null = null;

  // Cart items from ProductCard @Output — same pattern as modern.
  // @Input and @Output decorators work the same in both legacy and modern.
  cartItems: { name: string; quantity: number }[] = [];

  onAddToCart(item: { name: string; quantity: number }): void {
    this.cartItems.push(item);
  }

  // Template ref demo handler — same as modern version.
  onSearch(term: string): void {
    console.log('Searching for:', term);
  }
}
