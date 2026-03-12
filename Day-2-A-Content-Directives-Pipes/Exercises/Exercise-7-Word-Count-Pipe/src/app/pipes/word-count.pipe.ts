// word-count.pipe.ts — Exercise 7: Word Count Pipe
// TODO (Part A): Implement the WordCountPipe
//
// The @Pipe decorator is in place. Your job is to implement the transform() method.
//
// Steps:
//   1. Trim the value and split on whitespace: value.trim().split(/\s+/)
//   2. Filter out empty strings — handles edge cases with extra spaces
//   3. Return "N words" as a string — e.g., "12 words"

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount',
  standalone: true,
  pure: true  // pure = re-runs only when input value reference changes
})
export class WordCountPipe implements PipeTransform {
  transform(value: string): string {
    // TODO: replace this placeholder with the real implementation
    return '? words';
  }
}
