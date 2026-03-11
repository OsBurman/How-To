/**
 * app.component.ts — Root Application Component
 *
 * The parent component that demonstrates:
 * - Importing and rendering child components (ProductCard, CharacterCounter, SignalCounter)
 * - Safe navigation ?. for accessing nested properties that might be null
 * - Nullish coalescing ?? for providing fallback values
 * - Handling @Output() events from child components
 * - Interpolation {{ }} for displaying data
 *
 * CLI command that generated this file:
 *   ng new d1b-templates-and-communication --standalone
 *   (AppComponent is created automatically as the root component)
 */

import { Component } from '@angular/core'; // Component decorator
import { ProductCardComponent } from './product-card/product-card.component'; // Child: @Input/@Output demo
import { CharacterCounterComponent } from './character-counter/character-counter.component'; // Child: all binding types
import { SignalCounterComponent } from './signal-counter/signal-counter.component'; // Child: signals preview

/**
 * User interface — defines the shape of user data.
 * Some properties are optional (?) to demonstrate safe navigation.
 * In a real app, this data would come from an API (Day 3).
 */
interface User {
  name: string;
  email?: string; // Optional — might not be provided
  address?: {     // Optional — the whole address block might be missing
    street?: string;
    city?: string;
    state?: string;
  };
}

/**
 * CartItem interface — defines items added from ProductCardComponent.
 * Always define interfaces for data shapes — never use loose objects.
 */
interface CartItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-root',        // Rendered into <app-root> in index.html
  standalone: true,             // No NgModule needed — manages its own dependencies
  imports: [
    ProductCardComponent,       // Enables <app-product-card> in the template
    CharacterCounterComponent,  // Enables <app-character-counter> in the template
    SignalCounterComponent      // Enables <app-signal-counter> in the template
  ],
  templateUrl: './app.component.html', // External template — always multi-file
  styleUrl: './app.component.css'      // External styles — always multi-file
})
export class AppComponent {
  /**
   * Page title displayed via interpolation {{ pageTitle }} in the header.
   * Interpolation is the simplest form of data binding — one-way from class to template.
   */
  readonly pageTitle: string = 'Day 1 Part B — Templates & Communication';

  /**
   * SAFE NAVIGATION DEMO — currentUser has data, including a nested address.
   * In the template, currentUser?.address?.city safely navigates the chain.
   * If any part is null/undefined, the expression returns undefined instead of crashing.
   */
  currentUser: User | null = {
    name: 'Emily',
    email: 'emily@example.com',
    address: {
      city: 'Portland',
      state: 'OR'
      // street is intentionally missing — demonstrates ?. returning undefined
    }
  };

  /**
   * NULLISH COALESCING DEMO — guestUser is null (simulating "no user logged in").
   * In the template: guestUser?.name ?? 'Anonymous Guest'
   *   - guestUser?.name evaluates to undefined (because guestUser is null)
   *   - ?? 'Anonymous Guest' provides the fallback value
   */
  guestUser: User | null = null;

  /**
   * Cart items collected from ProductCardComponent's @Output() addToCart events.
   * Each time a child emits, onAddToCart() pushes the item here.
   */
  cartItems: CartItem[] = [];

  /**
   * Stores the last search term from the template ref demo.
   * Updated when the user clicks the Search button.
   */
  lastSearchTerm: string = '';

  /**
   * Event handler for ProductCardComponent's @Output() addToCart.
   * This is how a parent receives data FROM a child:
   *   Child: this.addToCart.emit({ name, quantity })
   *   Parent template: (addToCart)="onAddToCart($event)"
   *   Parent class: this method receives $event as the 'item' parameter
   */
  onAddToCart(item: CartItem): void {
    this.cartItems.push(item);
  }

  /**
   * Handler for the template reference variable demo.
   * Receives the input value passed from the template: onSearch(searchInput.value)
   * The #searchInput ref gives direct access to the DOM element.
   */
  onSearch(term: string): void {
    this.lastSearchTerm = term;
  }
}
