/**
 * movie-list.component.ts — @switch, [ngStyle], Pipes, async
 *
 * CONCEPTS DEMONSTRATED:
 * - @switch / @case    — renders a different genre badge based on movie.genre
 * - [ngStyle]          — sets the rating bar width and color from a method
 * - | date             — formats a Date object for display
 * - | currency         — formats a number as a currency string
 * - | uppercase        — transforms a string to ALL CAPS
 * - | async            — subscribes to an Observable; auto-unsubscribes on destroy
 * - FilterPipe (pure)  — filters the movie list by genre
 * - TruncatePipe (pure) — truncates long descriptions to a character limit
 *
 * CLI command: ng generate component movie-list
 */

import { Component } from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgStyle,
  UpperCasePipe
} from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FilterPipe } from '../pipes/filter.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';

// Movie interface — exported so FilterPipe can reference it
export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: 'action' | 'comedy' | 'drama' | 'sci-fi';
  releaseDate: Date;
  ticketPrice: number;
  rating: number; // 1 to 5
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    AsyncPipe,    // required for the | async pipe in the template
    CurrencyPipe, // required for the | currency pipe
    DatePipe,     // required for the | date pipe
    NgClass,      // required for [ngClass] on filter buttons
    NgStyle,      // required for [ngStyle] on the rating bar
    UpperCasePipe, // required for the | uppercase pipe
    FilterPipe,   // custom pure pipe — filters movies by genre
    TruncatePipe  // custom pure pipe — truncates description text
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

  // Hard-coded movies — on Day 3 Part B these come from HttpClient
  readonly movies: Movie[] = [
    {
      id: 1,
      title: 'Angular: The Awakening',
      description: 'A developer discovers the power of standalone components and reactive signals in a world overrun by legacy NgModules. An epic journey from declarations to inject().',
      genre: 'sci-fi',
      releaseDate: new Date('2024-03-15'),
      ticketPrice: 14.99,
      rating: 5
    },
    {
      id: 2,
      title: 'The Last NgModule',
      description: 'A heroic team battles through thousands of lines of AppModule declarations to reach the promised land of standalone architecture.',
      genre: 'action',
      releaseDate: new Date('2023-11-22'),
      ticketPrice: 12.50,
      rating: 4
    },
    {
      id: 3,
      title: 'Observable Romance',
      description: 'Two async pipes meet in a template and fall in love, only to be automatically unsubscribed when the component is destroyed.',
      genre: 'comedy',
      releaseDate: new Date('2024-07-04'),
      ticketPrice: 11.00,
      rating: 3
    },
    {
      id: 4,
      title: 'inject() and the City',
      description: 'An inject() function navigates the bustling metropolis of dependency injection, leaving constructor injection far behind. A story of modern patterns.',
      genre: 'drama',
      releaseDate: new Date('2024-01-19'),
      ticketPrice: 13.75,
      rating: 4
    },
    {
      id: 5,
      title: 'Signal Processing',
      description: 'Scientists race to implement fine-grained reactivity before zone.js is deprecated in a thrilling race against the change detection clock.',
      genre: 'sci-fi',
      releaseDate: new Date('2025-02-14'),
      ticketPrice: 15.99,
      rating: 5
    }
  ];

  // The selected genre for the FilterPipe — empty string means "show all"
  selectedGenre = '';

  // Genre options for the filter buttons
  readonly genres: string[] = ['', 'action', 'comedy', 'drama', 'sci-fi'];

  // -------------------------------------------------------------------------
  // ASYNC PIPE DEMO
  //
  // of() creates an Observable that emits one value and completes.
  // .pipe(delay(1500)) simulates a 1.5-second network round-trip.
  //
  // The | async pipe in the template:
  //   1. Subscribes to this Observable automatically
  //   2. Renders null (loading state) until the Observable emits
  //   3. Renders the emitted value once it arrives
  //   4. Unsubscribes automatically when the component is destroyed
  //
  // On Day 3 Part B: replace of({...}).pipe(delay()) with http.get<Movie>(url)
  // -------------------------------------------------------------------------
  readonly featuredMovie$: Observable<Movie> = of({
    id: 99,
    title: 'featured: beyond the framework',
    description: 'The most anticipated Angular film of the decade.',
    genre: 'sci-fi' as const,
    releaseDate: new Date('2025-06-01'),
    ticketPrice: 19.99,
    rating: 5
  }).pipe(delay(1500));

  setGenre(genre: string): void {
    this.selectedGenre = genre;
  }

  // Returns an inline style object for [ngStyle] on the rating bar.
  // The return type is an object with CSS property strings as keys.
  getRatingBarStyle(rating: number): Record<string, string> {
    const pct = (rating / 5) * 100;
    const color = rating >= 4 ? '#22c55e' : rating >= 3 ? '#f59e0b' : '#ef4444';
    return {
      'width': `${pct}%`,
      'background-color': color
    };
  }
}
