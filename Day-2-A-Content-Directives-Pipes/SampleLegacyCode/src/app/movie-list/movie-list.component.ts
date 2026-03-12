/**
 * movie-list.component.ts — Legacy Movie List
 *
 * LEGACY PATTERNS SHOWN:
 * - No standalone: true
 * - No imports array — CommonModule provides all directives/pipes via AppModule
 * - Constructor injection pattern shown (no service to inject here, but the
 *   class uses constructor instead of field initializers for illustration)
 *
 * MODERN REPLACEMENTS:
 *   standalone: true + explicit imports per component
 *   @switch / @case instead of [ngSwitch] / *ngSwitchCase / *ngSwitchDefault
 *   @if (obs$ | async; as name) instead of *ngIf="obs$ | async as name"
 */

import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: 'action' | 'comedy' | 'drama' | 'sci-fi';
  releaseDate: Date;
  ticketPrice: number;
  rating: number;
}

@Component({
  selector: 'app-movie-list',
  // LEGACY: no standalone: true — declared in AppModule
  // LEGACY: no imports array — pipes and directives come from CommonModule
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

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
      description: 'An inject() function navigates the bustling metropolis of dependency injection, leaving constructor injection far behind.',
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

  selectedGenre = '';
  readonly genres: string[] = ['', 'action', 'comedy', 'drama', 'sci-fi'];

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

  getRatingBarStyle(rating: number): Record<string, string> {
    const pct = (rating / 5) * 100;
    const color = rating >= 4 ? '#22c55e' : rating >= 3 ? '#f59e0b' : '#ef4444';
    return { 'width': `${pct}%`, 'background-color': color };
  }

  // LEGACY: trackBy function for *ngFor — must be declared on the class.
  // MODERN REPLACEMENT: track movie.id inline in @for (required, not optional).
  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }

  // LEGACY: trackBy for genre buttons
  trackByGenre(index: number, genre: string): string {
    return genre;
  }
}
