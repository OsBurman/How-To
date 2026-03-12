/**
 * filter.pipe.ts — PROVIDED PIPE (do not modify)
 *
 * CONCEPT: Pure pipe — only re-runs when the input reference changes.
 *
 * FilterPipe filters an array of objects by a given property name and value.
 *
 * Usage in template:
 *   tasks | filter:'completed':false    → returns only tasks where completed === false
 *   tasks | filter:'completed':true     → returns only tasks where completed === true
 *
 * PURE PIPE NOTE:
 * This pipe only re-runs when the `tasks` array reference changes.
 * Mutating the array in place (e.g., tasks.push(...)) will NOT trigger re-evaluation.
 * You will explore this behaviour in Exercise 7.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true  // default — re-evaluates only when input reference changes
})
export class FilterPipe implements PipeTransform {

  transform<T>(items: T[], property: keyof T, value: T[keyof T]): T[] {
    if (!items || items.length === 0) {
      return [];
    }
    // Returns a new array — does not mutate the original
    return items.filter(item => item[property] === value);
  }

}
