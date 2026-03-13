import { Component, inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter-controls',
  standalone: true,
  imports: [],
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css'
})
export class CounterControlsComponent {

  // Same CounterService singleton — inject() returns the existing root instance.
  // When this component calls increment(), CounterDisplay re-renders automatically
  // because they share the same BehaviorSubject source.
  private readonly counterService = inject(CounterService);

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  reset(): void {
    this.counterService.reset();
  }
}
