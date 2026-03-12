// modern/app.component.ts — Exercise 9: MODERN skeleton
//
// This is the modern root component. It is standalone and imports
// the modern BookListComponent rather than relying on AppModule declarations.
//
// TODO Step 7 (last sub-step): once BookListComponent is converted,
// uncomment the import below and add it to imports[].

import { Component } from '@angular/core';
// import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO: add BookListComponent here once it is converted
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
