import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-display',
  standalone: true,
  imports: [],
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.css'
})
export class CounterDisplayComponent {

  // inject() gives us the SAME CounterService singleton that CounterControlsComponent uses.
  // That shared instance is what keeps both components in sync without passing props.
  private readonly counterService = inject(CounterService);

  // toSignal() subscribes to count and stores the latest value in a signal.
  // initialValue: 0 ensures the signal has a value before the first Observable emission.
  readonly count = toSignal(this.counterService.count, { initialValue: 0 });

  // isAtZero drives the disabled state of the Decrement button.
  // initialValue: true — the counter starts at 0, so the button starts disabled.
  readonly isAtZero = toSignal(this.counterService.isAtZero$, { initialValue: true });
}
