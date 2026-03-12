// non-empty.pipe.ts — Exercise 7 SOLUTION
// PROVIDED (unchanged from starter) — filters out empty strings.
//
// This pipe is pure — it only re-runs when the array REFERENCE changes.
// Mutating the array with .push() leaves the reference identical;
// the pipe skips re-evaluation and the view does not update.
// The fix in app.component.ts replaces .push() with the spread operator,
// which creates a new array reference and triggers the pipe to re-run.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonEmpty',
  standalone: true,
  pure: true
})
export class NonEmptyPipe implements PipeTransform {
  transform(values: string[]): string[] {
    return values.filter(v => v.trim().length > 0);
  }
}
