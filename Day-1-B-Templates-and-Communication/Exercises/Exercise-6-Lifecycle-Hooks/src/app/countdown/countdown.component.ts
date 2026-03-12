import { Component, Input } from '@angular/core';
// TODO (Step 3): Import OnInit and OnDestroy from '@angular/core'
// TODO (Step 4): Implement OnInit interface
// TODO (Step 5): Implement OnDestroy interface

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent {
  // TODO (Step 3): Add @Input() startValue: number = 10;

  // TODO (Step 3): Add currentValue: number = 0;

  // TODO (Step 3): Add private timerId: number | null = null;

  // TODO (Step 3): Add status: string = 'Ready';

  // TODO (Step 4): Implement ngOnInit()
  // - Set this.currentValue = this.startValue
  // - Set this.status = 'Running'
  // - Start an interval: this.timerId = window.setInterval(() => { ... }, 1000)
  //   Inside the interval callback:
  //     - Decrement this.currentValue by 1
  //     - If this.currentValue reaches 0, clear the interval and set status to 'Done!'

  // TODO (Step 5): Implement ngOnDestroy()
  // - If this.timerId is not null, call window.clearInterval(this.timerId)
  // - Set this.timerId = null
  // - (This prevents ghost timers when the component is removed from the DOM)
}
