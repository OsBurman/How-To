// word-count.pipe.ts — Exercise 7 SOLUTION
// CONCEPT: Custom pure pipe — @Pipe decorator, PipeTransform, transform()

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount',
  standalone: true,
  pure: true  // pure = re-runs only when input value reference changes
})
export class WordCountPipe implements PipeTransform {

  // SOLUTION:
  // 1. Guard against null / empty input
  // 2. Trim leading/trailing whitespace before splitting
  // 3. Split on any whitespace sequence (/\s+/ handles multiple spaces, tabs, newlines)
  // 4. Filter out empty strings — handles edge cases with extra spaces
  // 5. Return "N words" as a human-readable string
  transform(value: string): string {
    if (!value || !value.trim()) {
      return '0 words';
    }
    const words = value.trim().split(/\s+/).filter(w => w.length > 0);
    return `${words.length} words`;
  }
}
