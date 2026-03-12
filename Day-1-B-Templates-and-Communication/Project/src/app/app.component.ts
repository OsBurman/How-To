import { Component } from '@angular/core';
// Import child components — each must be in the imports array for Angular to recognize them
import { TipInputComponent } from './tip-input/tip-input.component';
import { HistoryPanelComponent } from './history-panel/history-panel.component';

// ── Interface for the tip calculation result ──
// Defines the shape of data emitted by TipInputComponent and displayed here.
// Using an interface keeps the data contract clear between parent and child.
export interface TipResult {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  calculatedAt: string;   // Formatted time string for the history panel
}

// ── Interface for a saved calculation in history ──
// Extends TipResult with an id for tracking individual entries.
export interface HistoryEntry {
  id: number;
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  calculatedAt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  // Both child components must be listed here so their selectors work in the template
  imports: [TipInputComponent, HistoryPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ── Properties ──

  // The most recent calculation result — starts as null (no calculation yet).
  // The template uses safe navigation (?.) and nullish coalescing (??) to handle this.
  lastResult: TipResult | null = null;

  // All past calculations — passed to HistoryPanelComponent via @Input()
  calculationHistory: HistoryEntry[] = [];

  // Default values passed DOWN to TipInputComponent via @Input()
  defaultBillAmount: number = 50.00;
  defaultTipPercentage: number = 18;

  // Tracks the next history entry ID
  private nextId: number = 1;

  // ── Methods ──

  // Event handler for the (calculate) @Output() from TipInputComponent.
  // Receives the TipResult object emitted by the child and stores it.
  onCalculate(result: TipResult): void {
    // Store as the latest result for the main display
    this.lastResult = result;

    // Add to history array — HistoryPanelComponent reads this via @Input()
    const entry: HistoryEntry = {
      id: this.nextId++,
      billAmount: result.billAmount,
      tipPercentage: result.tipPercentage,
      tipAmount: result.tipAmount,
      totalAmount: result.totalAmount,
      calculatedAt: result.calculatedAt
    };
    this.calculationHistory = [entry, ...this.calculationHistory];
  }

  // Called when the user clicks the "Clear History" button.
  // Demonstrates event binding (click) on a simple action.
  onClearHistory(): void {
    this.calculationHistory = [];
    this.lastResult = null;
    this.nextId = 1;
  }
}
