/**
 * filter.pipe.ts — Custom Pure Pipe (Genre Filter)
 *
 * Filters a Movie array by genre, returning only movies that match.
 * When 'All' is passed as the genre, the full array is returned unchanged.
 *
 * Usage in template:
 *   @let filteredMovies = movies | filter:selectedGenre;
 *
 * Pure pipe behaviour — important to understand:
 *   Because this pipe is pure (the default), Angular only re-runs transform()
 *   when the INPUT REFERENCE changes.
 *
 *   ✅ Changing selectedGenre triggers change detection → @let re-evaluates
 *      → a new genre string is passed in → transform() runs again. Works correctly.
 *
 *   ⚠️ If you mutated the movies array directly (e.g. movies.push(newMovie))
 *      WITHOUT creating a new array reference, Angular would NOT re-run this pipe
 *      because the reference (the array object itself) hasn't changed.
 *      The fix is: this.movies = [...this.movies, newMovie]  ← new reference.
 *
 * This is the "pure pipe gotcha" — see the Day 2 Part A slides for the full breakdown.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../app.component';   // import the shared Movie interface

@Pipe({
  name: 'filter',    // used in templates as: | filter:'All' or | filter:selectedGenre
  standalone: true,  // no NgModule required
  pure: true         // default; only re-runs when input reference changes
})
export class FilterPipe implements PipeTransform {

  /**
   * @param movies  — the full array of Movie objects
   * @param genre   — the genre string to filter by, e.g. 'Action' or 'All'
   * @returns       — filtered Movie[] array
   */
  transform(movies: Movie[], genre: string): Movie[] {
    // 'All' or empty string → return the full array
    if (!genre || genre === 'All') {
      return movies;
    }

    // Filter to only the movies whose genre matches the selected value
    return movies.filter(movie => movie.genre === genre);
  }
}
