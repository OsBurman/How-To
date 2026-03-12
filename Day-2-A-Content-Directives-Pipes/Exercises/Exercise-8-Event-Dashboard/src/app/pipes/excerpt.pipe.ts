// excerpt.pipe.ts — Exercise 8: Event Dashboard
// PROVIDED — do not modify this file.
//
// Truncates a string at the nearest word boundary before the character limit.
// Appends '…' if truncation occurred.
// Usage: {{ event.description | excerpt:100 }}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
  standalone: true,
  pure: true
})
export class ExcerptPipe implements PipeTransform {
  transform(value: string, limit: number = 80): string {
    if (!value || value.length <= limit) return value;
    const cutIndex = value.lastIndexOf(' ', limit);
    return value.slice(0, cutIndex > 0 ? cutIndex : limit) + '…';
  }
}
