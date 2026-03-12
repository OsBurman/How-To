import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy {
  // @Input(): receives the starting countdown value from the parent
  @Input() startValue: number = 10;

  // The current countdown value — decremented every second
  currentValue: number = 0;

  // Stores the interval ID so we can clear it in ngOnDestroy
  private timerId: number | null = null;

  // Status text displayed to the user
  status: string = 'Ready';

  // ngOnInit: runs after Angular sets the @Input() values
  // Sets up the countdown interval
  ngOnInit(): void {
    this.currentValue = this.startValue;
    this.status = 'Running';

    // Start a 1-second interval that decrements the counter
    this.timerId = window.setInterval(() => {
      this.currentValue--;
      if (this.currentValue <= 0) {
        // Countdown complete — clear the interval and update status
        if (this.timerId !== null) {
          window.clearInterval(this.timerId);
          this.timerId = null;
        }
        this.status = 'Done!';
      }
    }, 1000);
  }

  // ngOnDestroy: runs when Angular removes this component from the DOM
  // Clears the interval to prevent "ghost timers" that keep running
  ngOnDestroy(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
