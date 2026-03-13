import { Component } from '@angular/core';

// TODO 1: Add signal and computed to the import above
//         import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // TODO 2: Declare the count signal with an initial value of 0
  //         readonly count = signal(0);

  // TODO 3: Declare the doubled computed signal
  //         readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    // TODO 4: Use this.count.update() to increase the count by 1
  }

  decrement(): void {
    // TODO 5: Use this.count.update() to decrease the count by 1
  }

  reset(): void {
    // TODO 6: Use this.count.set() to reset the count to 0
  }
}
