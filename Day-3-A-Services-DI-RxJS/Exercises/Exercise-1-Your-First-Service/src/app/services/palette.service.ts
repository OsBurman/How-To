import { Injectable } from '@angular/core';
// TODO 2: Import BehaviorSubject and Observable from 'rxjs'
// import { BehaviorSubject, Observable } from 'rxjs';

// A service is just a TypeScript class decorated with @Injectable.
// providedIn: 'root' means Angular creates ONE instance for the whole app — a singleton.
// Any component that calls inject(PaletteService) gets the exact same instance.
@Injectable({ providedIn: 'root' })
export class PaletteService {

  // TODO 2: Add a private BehaviorSubject<string[]> here.
  //         BehaviorSubject requires an initial value — use the color list below.
  //         A private BehaviorSubject lets the service push new values (.next()),
  //         while components can only read the stream, not write to it.
  //
  //   private readonly colorsBs$ = new BehaviorSubject<string[]>([
  //     'Crimson', 'Teal', 'Gold', 'Slate', 'Coral'
  //   ]);

  // TODO 3: Expose a read-only Observable named colors$.
  //         .asObservable() strips the .next() method so consumers can't push values.
  //
  //   readonly colors$: Observable<string[]> = this.colorsBs$.asObservable();
}
