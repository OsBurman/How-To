// modern/app.component.ts — Exercise 9 SOLUTION
// BookListComponent is now imported directly — no AppModule, no declarations array.

import { Component } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // SOLUTION: BookListComponent is imported here directly.
  // In NgModule, it would be in AppModule.declarations[] — never imported here.
  // In standalone, each component declares its own dependencies.
  imports: [BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
