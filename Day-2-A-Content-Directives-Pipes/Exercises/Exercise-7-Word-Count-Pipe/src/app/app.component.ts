// app.component.ts — Exercise 7: Word Count Pipe
// All three parts of this exercise are driven from this component.
// You do NOT need to change this file until Part C Step 8.

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordCountPipe } from './pipes/word-count.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { NonEmptyPipe } from './pipes/non-empty.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, WordCountPipe, ExcerptPipe, NonEmptyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // --- Part A: WordCountPipe ---
  // Bound to the textarea; changes as the user types
  message: string = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

  // --- Part B: ExcerptPipe ---
  // A long article body used to demonstrate truncation at a word boundary
  readonly article = {
    title: 'The Future of Web Development',
    body: 'Web development has evolved dramatically over the past decade. Modern frameworks like Angular, React, and Vue have transformed how we think about building user interfaces. Component-based architecture allows developers to create reusable, maintainable code. Server-side rendering, static site generation, and edge computing are reshaping performance expectations. The lines between frontend and backend continue to blur as full-stack frameworks gain popularity and tooling matures.'
  };

  // --- Part C: Pure Pipe Mutation Observation ---
  // This array is passed to the NonEmptyPipe in the template.
  // The pipe is PURE, so it only re-runs when the array reference changes.
  notes: string[] = [
    'Angular pipes are pure by default',
    'Pure pipes only re-run when input reference changes'
  ];

  newNote: string = '';

  addNote(): void {
    if (!this.newNote.trim()) return;

    // BUG (Part C, Step 8): .push() mutates the existing array.
    // The NonEmptyPipe sees the same array reference and does NOT re-run.
    // The new note will not appear in the list.
    //
    // TODO Step 8: Replace the line below with a new array reference:
    //   this.notes = [...this.notes, this.newNote];
    // Then add the comment:
    //   // New reference required — pure pipe only re-runs when input reference changes
    this.notes.push(this.newNote);

    this.newNote = '';
  }
}
