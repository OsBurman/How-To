/**
 * filter.pipe.ts — Custom Pure Pipe
 *
 * CONCEPT: Pure pipe behavior and the array mutation gotcha
 *
 * FilterPipe filters an array of objects to items matching a given genre.
 * An empty genre string ('') returns all items.
 *
 * Usage in template:
 *   @for (movie of movies | filter:selectedGenre; track movie.id)
 *
 * ─────────────────────────────────────────────────────────────────
 * PURE PIPE BEHAVIOR (pure: true — the default):
 *
 * Angular calls transform() ONLY when the INPUT REFERENCE changes.
 * For an array, this means:
 *
 *   ✅ New array reference triggers the pipe:
 *      this.movies = [...this.movies, newMovie];  ← creates a NEW array
 *
 *   ❌ Mutating in place does NOT trigger the pipe:
 *      this.movies.push(newMovie);  ← same array reference → pipe does NOT re-run
 *
 * This is intentional — pure pipes are efficient. Angular avoids recomputing them
 * on every change detection cycle. The trade-off: you must be deliberate about
 * creating new references when your data changes.
 *
 * If you need the pipe to update on every mutation, you can set pure: false
 * to make it impure — but this runs on EVERY change detection cycle and
 * can cause significant performance problems in large lists.
 * ─────────────────────────────────────────────────────────────────
 *
 * CLI command: ng generate pipe pipes/filter
 */

import { Pipe, PipeTransform } from '@angular/core';

// Generic constraint — works with any array of objects that have a 'genre' property.
// This avoids a circular import with movie-list.component.ts.
export interface HasGenre {
  genre: string;
}

@Pipe({
  name: 'filter',   // used in templates as: items | filter:genreString
  standalone: true, // standalone pipe — no NgModule needed
  pure: true        // EXPLICIT: only re-evaluates when input reference changes
                    // Change to pure: false to see updates on array mutations
                    // (but expect performance costs in large lists)
})
export class FilterPipe implements PipeTransform {

  /**
   * @param items   Array of objects with a 'genre' property
   * @param genre   The genre to filter by; empty string returns all items
   * @returns       Filtered array (a new array reference)
   */
  transform<T extends HasGenre>(items: T[], genre: string): T[] {
    if (!genre) {
      return items; // empty string → return everything
    }
    // filter() returns a NEW array — safe for downstream pure pipes
    return items.filter(item => item.genre === genre);
  }

}
