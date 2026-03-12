// modern/pipes/truncate.pipe.ts — Exercise 9 SOLUTION
// CONCEPT: standalone: true on a pipe — no NgModule declaration needed
// This file is IDENTICAL to the one already provided in the starter.
// It is included here for completeness so students can compare file-by-file.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true  // SOLUTION: the only change from the legacy version
  // Legacy version had no standalone property — the pipe was in AppModule.declarations[]
  // Modern version: standalone: true means this pipe is imported directly
  // into each component's imports[] array — no shared module needed.
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value || value.length <= limit) {
      return value;
    }
    const truncated = value.substring(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…';
  }
}
