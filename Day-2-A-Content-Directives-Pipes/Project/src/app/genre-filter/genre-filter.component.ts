/**
 * genre-filter.component.ts — Genre Filter Bar
 *
 * Receives the list of genres and the currently active genre via @Input().
 * Emits the newly selected genre to the parent via @Output() when a button is clicked.
 *
 * This is a pure presentational component — it holds no state of its own.
 * The parent (AppComponent) owns selectedGenre and passes it back down via [activeGenre].
 *
 * Concepts demonstrated:
 *   - @Input() for receiving data from the parent
 *   - @Output() + EventEmitter for sending events to the parent
 *   - [ngClass] object syntax for the active-button highlight
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [NgClass],     // [ngClass] used in the template for the active-button state
  templateUrl: './genre-filter.component.html',
  styleUrl:    './genre-filter.component.css'
})
export class GenreFilterComponent {

  // List of genre strings to render as buttons
  // The parent passes: ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller']
  @Input() genres: string[] = [];

  // The currently active genre — passed back down from the parent after each selection
  @Input() activeGenre: string = 'All';

  // Emits the selected genre string up to the parent
  // Parent listens with: (genreSelected)="onGenreSelected($event)"
  @Output() genreSelected = new EventEmitter<string>();

  // Called when the user clicks a genre button
  onSelect(genre: string): void {
    this.genreSelected.emit(genre);   // send the value to the parent
  }
}
