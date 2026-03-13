import { Component } from '@angular/core';
// TODO 3: Add inject to the import above.
//   import { Component, inject } from '@angular/core';

// TODO 3: Import CounterService.
//   import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-controls',
  standalone: true,
  imports: [],
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css'
})
export class CounterControlsComponent {

  // TODO 3: Inject CounterService using inject().
  //         This is the SAME instance that CounterDisplayComponent gets.
  //         That shared instance is what keeps both components in sync.
  //   private readonly counterService = inject(CounterService);

  increment(): void {
    // TODO 3: Call this.counterService.increment()
  }

  decrement(): void {
    // TODO 3: Call this.counterService.decrement()
  }

  reset(): void {
    // TODO 3: Call this.counterService.reset()
  }
}
