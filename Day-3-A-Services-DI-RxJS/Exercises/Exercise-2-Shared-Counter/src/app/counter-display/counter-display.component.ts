import { Component } from '@angular/core';
// TODO 2: Add inject to the import above, and add the toSignal import below.
//   import { Component, inject } from '@angular/core';
//   import { toSignal } from '@angular/core/rxjs-interop';

// TODO 2: Import CounterService.
//   import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-display',
  standalone: true,
  imports: [],
  templateUrl: './counter-display.component.html',
  styleUrl: './counter-display.component.css'
})
export class CounterDisplayComponent {

  // TODO 2: Inject CounterService using inject() — no constructor.
  //   private readonly counterService = inject(CounterService);

  // TODO 2: Convert the count Observable to a signal.
  //         initialValue: 0 ensures the signal has a value before the Observable emits.
  //   readonly count = toSignal(this.counterService.count, { initialValue: 0 });

  // TODO 2: Convert isAtZero$ to a signal to drive the disabled state of the button.
  //   readonly isAtZero = toSignal(this.counterService.isAtZero$, { initialValue: true });
}
