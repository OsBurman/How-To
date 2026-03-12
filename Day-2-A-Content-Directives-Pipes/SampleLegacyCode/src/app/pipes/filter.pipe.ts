/**
 * filter.pipe.ts — Custom Pure Pipe (Legacy version)
 *
 * LEGACY PATTERN: Pipe declared in AppModule (not standalone)
 *
 * The pure pipe behavior is IDENTICAL to the modern version —
 * only the registration mechanism differs:
 *   LEGACY:  AppModule.declarations[] makes this pipe available globally
 *             across every component in the module
 *   MODERN:  standalone: true — import FilterPipe directly in each
 *             component's imports[] where it's needed
 *
 * The PURE PIPE MUTATION GOTCHA is the same in both versions:
 *   ✅ New reference triggers the pipe:  this.movies = [...this.movies, newMovie]
 *   ❌ Mutation does NOT:               this.movies.push(newMovie)
 *
 * CLI command: ng generate pipe pipes/filter
 */

import { Pipe, PipeTransform } from '@angular/core';

// Same HasGenre interface as the modern version for easy comparison
export interface HasGenre {
  genre: string;
}

@Pipe({
  name: 'filter'
  // LEGACY: no standalone: true — must appear in AppModule.declarations[]
  // pure: true is the default — only re-evaluates on input reference change
})
export class FilterPipe implements PipeTransform {

  transform<T extends HasGenre>(items: T[], genre: string): T[] {
    if (!genre) {
      return items;
    }
    return items.filter(item => item.genre === genre);
  }

}
