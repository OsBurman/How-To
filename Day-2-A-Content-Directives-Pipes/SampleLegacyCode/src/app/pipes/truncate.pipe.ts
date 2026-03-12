/**
 * truncate.pipe.ts — Custom Pure Pipe (Legacy version)
 *
 * LEGACY PATTERN: Pipe declared in AppModule (not standalone)
 * The pipe itself is identical — pure pipes work the same way
 * in both legacy and modern Angular.
 *
 * The ONLY difference is how it gets registered:
 *   LEGACY:  listed in AppModule.declarations[]
 *             → available to all components in the module
 *   MODERN:  standalone: true + imported directly in each component's imports[]
 *             → explicitly declared per component; no hidden dependencies
 *
 * CLI command: ng generate pipe pipes/truncate
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
  // LEGACY: no standalone: true — this pipe must be declared in AppModule
  // If you forget to add it to declarations[], you get:
  //   "The pipe 'truncate' could not be found!"
  // MODERN: standalone: true — import the class directly where needed
})
export class TruncatePipe implements PipeTransform {

  /**
   * @param value  The string to truncate
   * @param limit  Maximum number of characters (default: 100)
   * @returns      Original string if within limit, or truncated version with '…'
   */
  transform(value: string, limit: number = 100): string {
    if (value.length <= limit) {
      return value;
    }
    return value.slice(0, limit).trimEnd() + '…';
  }

}
