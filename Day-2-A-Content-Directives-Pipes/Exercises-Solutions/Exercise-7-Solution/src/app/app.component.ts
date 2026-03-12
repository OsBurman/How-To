// app.component.ts — Exercise 7 SOLUTION
// CONCEPT: Pure pipe mutation fix — new array reference triggers re-render

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
  message: string = 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

  // --- Part B: ExcerptPipe ---
  readonly article = {
    title: 'The Future of Web Development',
    body: 'Web development has evolved dramatically over the past decade. Modern frameworks like Angular, React, and Vue have transformed how we think about building user interfaces. Component-based architecture allows developers to create reusable, maintainable code. Server-side rendering, static site generation, and edge computing are reshaping performance expectations. The lines between frontend and backend continue to blur as full-stack frameworks gain popularity and tooling matures.'
  };

  // --- Part C: Pure Pipe Mutation Observation ---
  notes: string[] = [
    'Angular pipes are pure by default',
    'Pure pipes only re-run when input reference changes'
  ];

  newNote: string = '';

  addNote(): void {
    if (!this.newNote.trim()) return;

    // SOLUTION (Step 8): spread operator creates a NEW array reference.
    // The NonEmptyPipe sees a different reference and re-evaluates.
    // The new note now appears in the rendered list.
    //
    // BEFORE (the bug):  this.notes.push(this.newNote);
    // push() mutates the existing array — the reference stays the same.
    // A pure pipe sees the same reference and skips re-evaluation.
    //
    this.notes = [...this.notes, this.newNote];
    // New reference required — pure pipe only re-runs when input reference changes

    this.newNote = '';
  }
}
