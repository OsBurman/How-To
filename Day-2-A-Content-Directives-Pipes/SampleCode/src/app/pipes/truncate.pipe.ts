/**
 * truncate.pipe.ts — Custom Pure Pipe
 *
 * CONCEPT: Custom pipe with configurable arguments
 *
 * TruncatePipe shortens a string to a specified character limit
 * and appends '…' if the string was truncated.
 *
 * Usage in template:
 *   {{ movie.description | truncate:80 }}
 *   {{ movie.description | truncate }}       ← uses the default limit of 100
 *
 * PURE PIPE (pure: true is the default):
 * Angular only calls transform() when the INPUT VALUE REFERENCE changes.
 * For a string input, any change to the string creates a new reference,
 * so pure behavior is correct and efficient here.
 *
 * CLI command: ng generate pipe pipes/truncate
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',  // the name used in templates: {{ value | truncate:limit }}
  standalone: true,  // standalone pipe — imported directly, no NgModule needed
  pure: true         // default; only re-runs when the input reference changes
})
export class TruncatePipe implements PipeTransform {

  /**
   * @param value  The string to truncate
   * @param limit  Maximum number of characters to display (default: 100)
   * @returns      The original string if within limit, or a truncated version with '…'
   */
  transform(value: string, limit: number = 100): string {
    if (value.length <= limit) {
      return value; // already short enough — return unchanged
    }
    // Slice to the limit and append ellipsis
    return value.slice(0, limit).trimEnd() + '…';
  }

}
