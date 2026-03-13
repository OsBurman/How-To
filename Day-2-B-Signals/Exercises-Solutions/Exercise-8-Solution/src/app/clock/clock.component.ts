import { DatePipe } from '@angular/common';
import { Component, OnDestroy, signal, computed } from '@angular/core';

// OBSERVATION: This component updates every second via setInterval.
// Open the console and watch the logs to see exactly when Angular runs code.

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnDestroy {

  readonly time = signal(Date.now());

  // Step 2: console.log added — you should see this fire every second.
  // This is the signal UPDATE — it writes a new value into time().
  private readonly intervalId = setInterval(() => {
    console.log('Clock: time signal updating');
    this.time.set(Date.now());
  }, 1000);

  // Step 6: hourMessage reads time() — so it IS a dependency of this computed.
  // Watch the console: you'll see "Clock: hourMessage computing" fire every second,
  // because time() changes every second and hourMessage depends on time().
  readonly hourMessage = computed(() => {
    console.log('Clock: hourMessage computing');
    return `The hour is ${new Date(this.time()).getHours()}`;
  });

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
