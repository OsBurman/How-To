// modern/book-list/book-list.component.ts — Exercise 9: MODERN skeleton
//
// TODO Step 7:
// 1. Add standalone: true to @Component
// 2. Fill in the imports[] array with:
//      NgClass, NgTemplateOutlet (from @angular/common)
//      DatePipe, CurrencyPipe, TitleCasePipe (from @angular/common)
//      BookCardComponent, StatusBadgeComponent (from the modern subfolders)
//      TruncatePipe (from the modern pipes folder)
//    All are standalone — import them directly, no AppModule needed.
// 3. Open modern/book-list/book-list.component.html and convert the structural directives.

import { Component } from '@angular/core';
import { Book } from '../../book-list/book-list.component'; // reusing the same interface

@Component({
  selector: 'app-book-list',
  // TODO: add standalone: true
  // TODO: add imports: [NgClass, NgTemplateOutlet, DatePipe, CurrencyPipe, TitleCasePipe,
  //                     BookCardComponent, StatusBadgeComponent, TruncatePipe]
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  readonly books: Book[] = [
    {
      id: 1,
      title: 'The Pragmatic Programmer',
      author: 'David Thomas & Andrew Hunt',
      genre: 'non-fiction',
      status: 'available',
      price: 49.99,
      publishedDate: '2019-09-20',
      description: 'A classic guide to software craftsmanship covering career advice, programming philosophy, and practical techniques that have aged remarkably well across decades of changing tooling.'
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      genre: 'non-fiction',
      status: 'checked-out',
      price: 39.95,
      publishedDate: '2008-08-01',
      description: 'A handbook of agile software craftsmanship packed with case studies, refactoring examples, and a solid set of principles for writing readable and maintainable code every day.'
    },
    {
      id: 3,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
      genre: 'fiction',
      status: 'available',
      price: 14.99,
      publishedDate: '1979-10-12',
      description: 'A comic science fiction novel that follows an unwitting human swept off Earth moments before its destruction, guided by a peculiar alien companion through the universe.'
    },
    {
      id: 4,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      genre: 'science',
      status: 'reserved',
      price: 19.99,
      publishedDate: '1988-03-01',
      description: 'Hawking explores cosmological concepts from the Big Bang to black holes, written for general readers with no prior background in physics or mathematics required.'
    },
    {
      id: 5,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'history',
      status: 'available',
      price: 24.99,
      publishedDate: '2015-02-10',
      description: 'A sweeping narrative of human history from the first Homo sapiens in Africa to the modern political and technological revolutions that have reshaped every aspect of life.'
    }
  ];
}
