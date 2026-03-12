// excerpt.pipe.ts — Exercise 7 SOLUTION
// CONCEPT: Custom pure pipe with a parameter, word-boundary truncation

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
  standalone: true,
  pure: true  // pure = re-runs only when input value reference changes
})
export class ExcerptPipe implements PipeTransform {

  // SOLUTION:
  // 1. Guard against null / short strings — return unchanged if at or under limit
  // 2. value.lastIndexOf(' ', limit) finds the last space AT OR BEFORE the limit index
  //    This ensures we never cut mid-word
  // 3. If no space exists before the limit (very long single word), fall back to limit
  // 4. Append the ellipsis character '…' (not three dots '...')
  transform(value: string, limit: number = 80): string {
    if (!value || value.length <= limit) {
      return value;
    }
    // Find the last word boundary at or before the limit
    const cutIndex = value.lastIndexOf(' ', limit);
    const sliceIndex = cutIndex > 0 ? cutIndex : limit;
    return value.substring(0, sliceIndex) + '…';
  }
}
