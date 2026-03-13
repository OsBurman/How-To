import { DatePipe } from '@angular/common';
import { Component, OnDestroy, signal, computed } from '@angular/core';

// ClockComponent — ticks every second using setInterval.
// Its time signal is completely isolated from CounterComponent.
// Any computed() that reads time() will re-run every second.
// Any computed() that does NOT read time() will NOT re-run.
@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnDestroy {

  // time holds the current timestamp — updates every second via setInterval
  readonly time = signal(Date.now());

  // TODO (step 2): Add a console.log inside the setInterval callback, just before
  // this.time.set(...), so you can see when the signal is being updated:
  //   console.log('Clock: time signal updating');
  private readonly intervalId = setInterval(() => {
    this.time.set(Date.now());
  }, 1000);

  // TODO (step 6): Add a computed() that reads time() and logs when it runs:
  //   readonly hourMessage = computed(() => {
  //     console.log('Clock: hourMessage computing');
  //     return `The hour is ${new Date(this.time()).getHours()}`;
  //   });
  // Then display {{ hourMessage() }} in clock.component.html.

  // Clean up the interval when the component is destroyed
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
