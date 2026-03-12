// non-empty.pipe.ts — Exercise 7: Word Count Pipe
// PROVIDED — do not modify this file.
//
// This pipe filters a string array to only non-empty (truthy) strings.
// It is used in the Notes section to demonstrate pure pipe behaviour.
//
// Because it is a PURE pipe, it only re-runs when the input array reference changes.
// If you mutate the array in place (e.g., with .push()), this pipe will NOT re-run.
// That's the bug you observe and fix in Part C.

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
