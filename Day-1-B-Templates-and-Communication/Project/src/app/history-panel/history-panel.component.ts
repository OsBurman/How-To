import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// Import the HistoryEntry interface from the parent component
import { HistoryEntry } from '../app.component';

@Component({
  selector: 'app-history-panel',
  standalone: true,
  imports: [],
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent implements OnInit, OnDestroy {
  // ── @Input() — Receives the history array from the parent ──
  // The parent passes this via property binding: [history]="calculationHistory"
  // Every time the parent updates its array, Angular passes the new reference here.
  @Input() history: HistoryEntry[] = [];

  // ── Component properties ──

  // Tracks how many seconds the panel has been open — updated by an interval timer
  secondsOpen: number = 0;

  // Stores the interval timer ID so we can clear it in ngOnDestroy
  // Without clearing this, the timer would keep running even after
  // Angular removes this component from the DOM — a memory leak.
  private timerId: number | null = null;

  // ── Lifecycle Hook: ngOnInit ──
  // Runs once after Angular initializes the component and sets @Input() values.
  // We start an interval timer here that counts seconds — this demonstrates
  // a real use case for ngOnDestroy cleanup.
  ngOnInit(): void {
    console.log('HistoryPanelComponent initialized — starting timer');
    this.secondsOpen = 0;

    // Start a timer that increments every second
    // We store the timer ID so we can clear it later in ngOnDestroy
    this.timerId = window.setInterval(() => {
      this.secondsOpen++;
    }, 1000);
  }

  // ── Lifecycle Hook: ngOnDestroy ──
  // Runs once when Angular is about to remove this component from the DOM.
  // CRITICAL: Clear the interval timer to prevent a "ghost timer" that keeps
  // running in the background, consuming resources and potentially causing errors.
  // This is the #1 cleanup pattern students need to learn.
  ngOnDestroy(): void {
    console.log('HistoryPanelComponent destroyed — clearing timer');
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // ── Methods ──

  // Formats a currency value for display.
  // Called from the template via interpolation: {{ formatCurrency(entry.tipAmount) }}
  formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null) {
      return '$—';
    }
    return '$' + value.toFixed(2);
  }
}
