import { Component } from '@angular/core';
// TODO 4: Add inject to the import above, and add the toSignal import below.
//   import { Component, inject } from '@angular/core';
//   import { toSignal } from '@angular/core/rxjs-interop';

// TODO 4: Import PaletteService once you've implemented it.
//   import { PaletteService } from './services/palette.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // TODO 5: Inject PaletteService at the class body level — no constructor.
  //         inject() must be called in a class field initializer or constructor,
  //         not inside a method.
  //
  //   private readonly paletteService = inject(PaletteService);

  // TODO 6: Convert the colors$ Observable into a signal using toSignal().
  //         The initialValue means the signal has a value immediately, before
  //         the Observable emits — no null flash, no guard needed in the template.
  //
  //   readonly colors = toSignal(this.paletteService.colors$, { initialValue: [] });
}
