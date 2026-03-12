// book-card.component.ts — Exercise 9: LEGACY
// A simple display component that receives a Book via @Input().
// Declared in AppModule — no standalone: true.

import { Component, Input } from '@angular/core';
import { Book } from '../book-list/book-list.component';

@Component({
  selector: 'app-book-card',
  // LEGACY: no standalone: true
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book!: Book;
}
