import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Import the TipResult interface from the parent — keeps the contract in one place
import { TipResult } from '../app.component';

@Component({
  selector: 'app-tip-input',
  standalone: true,
  // FormsModule is required for [(ngModel)] two-way binding on the inputs
  imports: [FormsModule],
  templateUrl: './tip-input.component.html',
  styleUrl: './tip-input.component.css'
})
export class TipInputComponent implements OnInit {
  // ── @Input() — Data flows DOWN from the parent ──
  // The parent sends default values via property binding:
  //   <app-tip-input [billAmount]="50" [tipPercentage]="18">
  // These @Input() properties receive those values.

  // Default bill amount — the parent can override this via [billAmount]="value"
  @Input() billAmount: number = 0;

  // Default tip percentage — the parent can override this via [tipPercentage]="value"
  @Input() tipPercentage: number = 15;

  // ── @Output() — Events flow UP to the parent ──
  // When the user clicks "Calculate", this emits the TipResult object.
  // The parent listens via: (calculate)="onCalculate($event)"
  @Output() calculate = new EventEmitter<TipResult>();

  // ── Component properties ──

  // Two-way bound to the bill amount input via [(ngModel)]
  // Demonstrates two-way binding — typing in the field updates this property,
  // and changing this property updates the field.
  currentBill: number = 0;

  // Two-way bound to the tip percentage input via [(ngModel)]
  currentTipPercentage: number = 15;

  // Tracks whether a calculation has been performed (for the success message)
  lastCalculationTime: string = '';

  // ── Lifecycle Hook: ngOnInit ──
  // Runs AFTER Angular sets the @Input() values.
  // This is the right place to use @Input() data for initialization.
  // The constructor runs BEFORE inputs are set — using @Input() values
  // in the constructor would give you the default values, not the parent's values.
  ngOnInit(): void {
    // Use the @Input() values to set our working properties.
    // If the parent passed [billAmount]="50", this.billAmount is already 50 here.
    this.currentBill = this.billAmount;
    this.currentTipPercentage = this.tipPercentage;
    console.log(
      `TipInputComponent initialized with bill=$${this.billAmount}, tip=${this.tipPercentage}%`
    );
  }

  // ── Methods ──

  // Called when the user clicks the "Calculate Tip" button.
  // Builds a TipResult object and emits it to the parent via @Output().
  onCalculateTip(): void {
    const tipAmount = this.roundToTwo(this.currentBill * (this.currentTipPercentage / 100));
    const totalAmount = this.roundToTwo(this.currentBill + tipAmount);

    const result: TipResult = {
      billAmount: this.currentBill,
      tipPercentage: this.currentTipPercentage,
      tipAmount: tipAmount,
      totalAmount: totalAmount,
      calculatedAt: new Date().toLocaleTimeString()
    };

    // Emit the result UP to the parent via the @Output() EventEmitter
    this.calculate.emit(result);

    // Update the local timestamp for the success message
    this.lastCalculationTime = result.calculatedAt;
  }

  // Called from the template when the user clicks a quick-tip button.
  // Uses template reference variables — the percentage value is read from
  // the button's data attribute and passed directly to this method.
  onQuickTip(billRef: HTMLInputElement, percentage: number): void {
    // Read the current bill value from the template reference variable
    this.currentBill = parseFloat(billRef.value) || 0;
    this.currentTipPercentage = percentage;
    // Immediately calculate with the quick-tip values
    this.onCalculateTip();
  }

  // Utility: round to two decimal places for currency display
  private roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
