/**
 * product-card.component.ts — Product Card Component
 *
 * Demonstrates:
 * - @Input() — receiving data (name, price) from the parent component
 * - @Output() + EventEmitter — sending events (addToCart) to the parent
 * - ngOnInit — processing @Input() data AFTER Angular sets the values
 *   (the constructor runs BEFORE inputs are set, so initialization logic goes here)
 * - Template reference variable — #quantityInput reads the input's value directly
 *
 * CLI command that generated this file:
 *   ng generate component product-card --standalone
 *   (shorthand: ng g c product-card --standalone)
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * CartEvent — the shape of the object emitted when the user adds a product to the cart.
 * Always define interfaces for event payloads — never emit loose untyped objects.
 */
interface CartEvent {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-product-card',  // Use as <app-product-card> in parent templates
  standalone: true,               // No NgModule needed
  imports: [],                    // No child components or directives used in this template
  templateUrl: './product-card.component.html', // External template — always multi-file
  styleUrl: './product-card.component.css'      // External styles — always multi-file
})
export class ProductCardComponent implements OnInit {

  // ── @INPUT: Data flows IN from the parent ──

  /**
   * @Input() name — the product name, set by the parent via [name]="value".
   * In the parent template: <app-product-card name="Angular in Action">
   * Data flows ONE direction: parent → child. The child cannot push changes back.
   */
  @Input() name: string = '';

  /**
   * @Input() price — the product price, set by the parent via [price]="29.99".
   * Property binding [price]="29.99" evaluates 29.99 as an expression (a number).
   * Without brackets, price="29.99" would pass the STRING "29.99", not a number.
   */
  @Input() price: number = 0;

  // ── @OUTPUT: Events flow OUT to the parent ──

  /**
   * @Output() addToCart — emits an event when the user clicks "Add to Cart".
   * EventEmitter<CartEvent> means it emits objects matching the CartEvent interface.
   *
   * In the parent template:
   *   <app-product-card (addToCart)="onAddToCart($event)">
   *
   * The parent's onAddToCart method receives the CartEvent as $event.
   * This is child → parent communication: @Output for events UP, @Input for data DOWN.
   */
  @Output() addToCart = new EventEmitter<CartEvent>();

  // ── COMPONENT STATE ──

  /**
   * displayLabel — built from @Input() values in ngOnInit.
   * We can't build this in the constructor because @Input() values haven't been set yet.
   */
  displayLabel: string = '';

  // ── LIFECYCLE: ngOnInit ──

  /**
   * ngOnInit runs AFTER Angular sets all @Input() properties.
   *
   * ⚠️ WHY NOT THE CONSTRUCTOR?
   * The constructor runs when the class is instantiated — BEFORE Angular has a chance
   * to set @Input() values. If you tried to read this.name or this.price in the
   * constructor, they'd still be the default values ('' and 0).
   *
   * ngOnInit is the right place for initialization logic that depends on input data.
   * Think of it as: constructor = class setup, ngOnInit = Angular setup.
   */
  ngOnInit(): void {
    // At this point, this.name and this.price have their actual values from the parent
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
  }

  // ── EVENT HANDLER ──

  /**
   * Called when the user clicks "Add to Cart".
   * Reads the quantity from the template reference variable (#quantityInput.value)
   * and emits a CartEvent via the @Output() EventEmitter.
   *
   * @param quantityStr — the string value from the <input> element (DOM values are always strings)
   */
  onAddToCart(quantityStr: string): void {
    const quantity: number = parseInt(quantityStr, 10) || 1; // Parse string to number; default to 1
    this.addToCart.emit({ name: this.name, quantity }); // Emit the event UP to the parent
  }
}
