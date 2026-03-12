// excerpt.pipe.ts — Exercise 7: Word Count Pipe
// TODO (Part B): Implement the ExcerptPipe
//
// The @Pipe decorator is in place. Your job is to implement the transform() method.
//
// Steps:
//   1. If value.length <= limit, return value unchanged — nothing to truncate
//   2. Find the last space at or before the limit:
//        const cutIndex = value.lastIndexOf(' ', limit);
//   3. Slice the string to cutIndex (or to limit if no space found) and append '…'

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
  standalone: true,
  pure: true  // pure = re-runs only when input value reference changes
})
export class ExcerptPipe implements PipeTransform {
  // limit defaults to 80 characters if no argument is passed in the template
  transform(value: string, limit: number = 80): string {
    // TODO: replace this placeholder with the real implementation
    return value;
  }
}
