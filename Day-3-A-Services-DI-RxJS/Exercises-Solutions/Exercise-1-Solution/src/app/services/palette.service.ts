import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// A service is just a TypeScript class decorated with @Injectable.
// providedIn: 'root' means Angular creates ONE instance for the whole app — a singleton.
// Any component that calls inject(PaletteService) gets the exact same instance.
@Injectable({ providedIn: 'root' })
export class PaletteService {

  // BehaviorSubject holds the current value and replays it to every new subscriber.
  // It's private so only this service can call .next() — components can only read.
  private readonly colorsBs$ = new BehaviorSubject<string[]>([
    'Crimson', 'Teal', 'Gold', 'Slate', 'Coral'
  ]);

  // .asObservable() strips the .next() method from the exposed stream.
  // Consumers get Observable<string[]> — read-only access to the color list.
  readonly colors$: Observable<string[]> = this.colorsBs$.asObservable();
}
