// modern/pipes/truncate.pipe.ts — Exercise 9: MODERN
// Key difference from the legacy version: standalone: true
//
// LEGACY: no standalone property → pipe was declared in AppModule's declarations[]
//         and became available to every component in the module automatically.
//
// MODERN: standalone: true → pipe is self-contained; any component that needs it
//         must import it directly in its own imports[] array.
//         There is no shared module — each component declares its own dependencies.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true  // ← the only change from the legacy version
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value || value.length <= limit) {
      return value;
    }
    // Trim to the limit, then cut back to the last complete word
    const truncated = value.substring(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…';
  }
}
