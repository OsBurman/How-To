/**
 * app.component.ts — Root Component
 *
 * Holds the complete movie catalogue and the currently selected genre filter.
 * The template uses FilterPipe to derive the visible list, and @let to define
 * a filteredCount variable that's used in both the header subtitle and the footer
 * — that's the whole point of @let: compute once, use anywhere in the template.
 *
 * Concepts demonstrated:
 *   - Interface definition (Movie)
 *   - Data array as component property
 *   - [ngClass] with string shorthand (genre badge colours)
 *   - @let for a template-scoped derived value
 *   - @if/@else with ng-template for the empty state
 *   - @for with track for the movie list
 *   - @switch/@case for the star rating display
 *   - ng-container to group without adding DOM nodes
 *   - Named ng-content slots (consumed inside MovieCardComponent)
 *   - Built-in pipes: date, currency, uppercase
 *   - Custom pure pipes: TruncatePipe, FilterPipe
 *   - [ngStyle] (applied via @Input to MovieCardComponent)
 */

import { Component }            from '@angular/core';
import { NgClass, NgStyle,
         UpperCasePipe, DatePipe,
         CurrencyPipe,
         NgTemplateOutlet }     from '@angular/common';
import { MovieCardComponent }   from './movie-card/movie-card.component';
import { GenreFilterComponent } from './genre-filter/genre-filter.component';
import { TruncatePipe }         from './pipes/truncate.pipe';
import { FilterPipe }           from './pipes/filter.pipe';

// ── Data shape ──────────────────────────────────────────────────────────────
// Always define interfaces above the component that owns the data.
export interface Movie {
  id: number;
  title: string;
  genre: 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Thriller';
  releaseDate: string;   // ISO 8601 — the date pipe will format this in the template
  rating: number;        // 1–5; drives the @switch block in the template
  description: string;   // TruncatePipe keeps this under 120 characters in the card
  posterEmoji: string;
  budget: number;        // shown with the currency pipe in the template
}

@Component({
  selector: 'app-root',
  standalone: true,                    // no NgModule required
  imports: [
    MovieCardComponent,                // child component with named ng-content slots
    GenreFilterComponent,              // child component that emits the selected genre
    TruncatePipe,                      // custom pure pipe — truncates descriptions
    FilterPipe,                        // custom pure pipe — filters movies by genre
    NgClass,                           // [ngClass] directive for genre badge colours
    NgStyle,                           // [ngStyle] directive (passed to MovieCard via @Input)
    UpperCasePipe,                     // | uppercase — used on genre label in badge
    DatePipe,                          // | date:'mediumDate' — used on release date
    CurrencyPipe,                      // | currency — used on budget
    NgTemplateOutlet,                  // [ngTemplateOutlet] — renders the #noResults ng-template
  ],
  templateUrl: './app.component.html',
  styleUrl:    './app.component.css'
})
export class AppComponent {

  // Full catalogue — FilterPipe derives the visible subset from this array
  movies: Movie[] = [
    {
      id: 1,
      title: 'Starfall: Origins',
      genre: 'Sci-Fi',
      releaseDate: '2024-03-15',
      rating: 5,
      description: 'When a deep-space probe returns carrying alien DNA, a xenobiologist must stop a corporate cover-up before the organism reaches Earth\'s population centers and triggers a global pandemic.',
      posterEmoji: '🚀',
      budget: 180000000
    },
    {
      id: 2,
      title: 'The Last Harvest',
      genre: 'Drama',
      releaseDate: '2024-07-22',
      rating: 4,
      description: 'Three generations of a farming family must confront long-buried secrets when a drought forces them to sell the land that has defined their identity for over a century.',
      posterEmoji: '🌾',
      budget: 25000000
    },
    {
      id: 3,
      title: 'Rapid Fire',
      genre: 'Action',
      releaseDate: '2024-05-10',
      rating: 3,
      description: 'An elite counter-terrorism unit races against the clock to dismantle a weapons network spanning seven countries before a scheduled summit of world leaders becomes a target.',
      posterEmoji: '💥',
      budget: 140000000
    },
    {
      id: 4,
      title: 'Flat Whites and Feelings',
      genre: 'Comedy',
      releaseDate: '2024-09-01',
      rating: 4,
      description: 'A barista who secretly writes self-help books under a pseudonym is forced to maintain the deception when the most cynical person in the city becomes her biggest fan.',
      posterEmoji: '☕',
      budget: 18000000
    },
    {
      id: 5,
      title: 'The Watcher',
      genre: 'Thriller',
      releaseDate: '2024-11-08',
      rating: 5,
      description: 'A forensic accountant stumbles across a pattern in corporate filings that hints at a decades-long conspiracy. As she digs deeper, she realises someone has been watching her every move.',
      posterEmoji: '👁️',
      budget: 45000000
    },
    {
      id: 6,
      title: 'Echo Chamber',
      genre: 'Sci-Fi',
      releaseDate: '2023-12-25',
      rating: 3,
      description: 'In a near-future city where memories can be recorded and replayed in court, a detective discovers that the memories used as evidence in a high-profile murder trial have been altered.',
      posterEmoji: '🔮',
      budget: 95000000
    },
    {
      id: 7,
      title: 'Sunday Punch',
      genre: 'Comedy',
      releaseDate: '2024-02-14',
      rating: 2,
      description: 'A retired professional wrestler opens a flower shop in a tough neighbourhood, only to discover that his new employees and his old rivals have far more in common than anyone expected.',
      posterEmoji: '🌸',
      budget: 12000000
    },
    {
      id: 8,
      title: 'Verdict',
      genre: 'Drama',
      releaseDate: '2024-08-30',
      rating: 4,
      description: 'A defence attorney who always believed her client was innocent is handed new evidence one hour before the jury delivers its verdict — evidence that could change everything or end her career.',
      posterEmoji: '⚖️',
      budget: 32000000
    }
  ];

  // All unique genre values plus 'All' for the filter bar
  allGenres: string[] = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller'];

  // Currently selected genre — starts as 'All' (show everything)
  selectedGenre: string = 'All';

  // Called when GenreFilterComponent emits (genreSelected)
  onGenreSelected(genre: string): void {
    this.selectedGenre = genre;
  }

  // Returns the left-border accent colour for each genre — passed to MovieCard via @Input
  getGenreColor(genre: string): string {
    const colors: Record<string, string> = {
      'Action':   '#e74c3c',   // red
      'Drama':    '#9b59b6',   // purple
      'Comedy':   '#f39c12',   // amber
      'Sci-Fi':   '#2980b9',   // blue
      'Thriller': '#1abc9c',   // teal
    };
    return colors[genre] ?? '#7f8c8d';   // grey fallback
  }

  // Returns a CSS-safe class name for [ngClass] genre badge colouring
  // Converts 'Sci-Fi' → 'genre-scifi', 'Action' → 'genre-action', etc.
  getGenreClass(genre: string): string {
    return 'genre-' + genre.toLowerCase().replace(/[^a-z]/g, '');
  }
}
