// filter.pipe.ts — Exercise 8: Event Dashboard
// PROVIDED — do not modify this file.
//
// Filters an array of objects by a given property and value.
// Used in the template to count upcoming events:
//   events | filter:'isPast':false
//
// Because this is a PURE pipe, it only re-runs when the events array
// reference changes. To trigger it, assign a new array — do not mutate.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], property: keyof T, value: T[keyof T]): T[] {
    return items.filter(item => item[property] === value);
  }
}
