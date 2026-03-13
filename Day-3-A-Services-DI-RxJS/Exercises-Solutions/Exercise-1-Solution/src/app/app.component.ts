import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaletteService } from './services/palette.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // inject() replaces constructor injection.
  // Angular resolves PaletteService from the root injector — same singleton instance everywhere.
  private readonly paletteService = inject(PaletteService);

  // toSignal() subscribes to colors$ and stores the latest value in a signal.
  // initialValue: [] means the signal has a value immediately — no null flash, no template guard.
  readonly colors = toSignal(this.paletteService.colors$, { initialValue: [] as string[] });
}
