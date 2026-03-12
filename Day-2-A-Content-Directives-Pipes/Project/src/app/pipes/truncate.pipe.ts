/**
 * truncate.pipe.ts — Custom Pure Pipe
 *
 * Truncates a string to a maximum number of characters, cutting at a word
 * boundary so words are never split in the middle, then appending '…'.
 *
 * Usage in template:
 *   {{ movie.description | truncate:120 }}
 *   {{ movie.description | truncate }}         ← uses default limit of 100
 *
 * Why it's pure (pure: true, which is the default):
 *   A pure pipe only re-runs its transform() method when the INPUT REFERENCE
 *   changes. If the same string object is passed in again, Angular skips the
 *   pipe entirely and uses the cached result.
 *
 *   For a string input (which is immutable), this is always safe.
 *   For an array or object, "pure" means only a NEW reference triggers the pipe —
 *   mutating the existing array in place does NOT trigger it. That's the
 *   "pure pipe gotcha" covered in the Day 2 Part A slides.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',    // used in templates as: | truncate or | truncate:120
  standalone: true,    // no NgModule required — import directly in component's imports[]
  pure: true           // default; shown explicitly as a teaching aid
})
export class TruncatePipe implements PipeTransform {

  /**
   * @param value  — the original string to truncate
   * @param limit  — maximum character count (default: 100)
   * @returns      — truncated string ending at a word boundary, with '…' appended
   */
  transform(value: string, limit: number = 100): string {
    // If the string is already within the limit, return it unchanged
    if (!value || value.length <= limit) {
      return value;
    }

    // Cut to the limit first
    const truncated = value.substring(0, limit);

    // Find the last space within the cut string so we don't break mid-word
    const lastSpace = truncated.lastIndexOf(' ');

    // If there's a space to cut at, use it; otherwise just cut at the limit
    const cleanCut = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;

    return cleanCut + '…';
  }
}
