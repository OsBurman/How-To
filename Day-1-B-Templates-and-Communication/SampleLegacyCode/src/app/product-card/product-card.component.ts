/**
 * legacy/product-card.component.ts — Product Card (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * KEY LEGACY DIFFERENCES:
 * - No standalone: true — must be in AppModule declarations.
 * - No imports: [] array on the component.
 * - styleUrls (plural array) instead of styleUrl (singular string).
 *
 * @Input() and @Output() decorators work the SAME in both legacy and modern.
 * These decorators are NOT legacy — they're the Day 1 approach. On Day 2,
 * students learn signal-based input() and output() as the modern evolution.
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  // No standalone: true — this component is declared in app.module.ts
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  // LEGACY: styleUrls is a plural ARRAY.
  // Modern equivalent: styleUrl: './product-card.component.css'
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // @Input() receives data FROM the parent component.
  // These decorators work the same in legacy and modern.
  @Input() name: string = '';
  @Input() price: number = 0;

  // @Output() sends events TO the parent component.
  @Output() addToCart = new EventEmitter<{ name: string; quantity: number }>();

  // Processed after inputs are set — same as modern version.
  displayLabel: string = '';

  /**
   * ngOnInit runs AFTER Angular sets @Input() values.
   * This is the correct place to process input data — NOT the constructor.
   * In the constructor, this.name and this.price would still be empty strings/zero.
   */
  ngOnInit(): void {
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
  }

  /**
   * Reads the quantity from the template ref value and emits
   * the addToCart event to the parent.
   */
  onAddToCart(quantityStr: string): void {
    this.addToCart.emit({
      name: this.name,
      quantity: parseInt(quantityStr, 10) || 1
    });
  }
}
