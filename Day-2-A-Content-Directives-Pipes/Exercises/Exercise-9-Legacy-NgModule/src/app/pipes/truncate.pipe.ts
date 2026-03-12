// truncate.pipe.ts — Exercise 9: LEGACY pipe (no standalone)
// In NgModule apps, pipes are declared in a module's declarations[] array.
// They become available to every component in that module automatically —
// no component needs to explicitly import TruncatePipe itself.
//
// Notice: NO standalone: true. That is what you add in the modern conversion.
// Compare with: src/app/modern/pipes/truncate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
  // LEGACY: no standalone: true — declared in AppModule instead
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value || value.length <= limit) return value;
    const cutIndex = value.lastIndexOf(' ', limit);
    return value.slice(0, cutIndex > 0 ? cutIndex : limit) + '…';
  }
}
