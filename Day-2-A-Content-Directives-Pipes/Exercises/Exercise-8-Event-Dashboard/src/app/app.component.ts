// app.component.ts — Exercise 8: Event Dashboard
// The Event interface, sample data, and getCategoryLabel() are all provided.
// Your work is primarily in app.component.html and app.component.css.

import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe, UpperCasePipe, NgClass, NgStyle } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';

// The shape of one event
export interface Event {
  id: number;
  title: string;
  description: string;
  category: 'music' | 'sport' | 'tech' | 'food';
  date: string;        // ISO 8601 date string — e.g., '2026-07-15'
  price: number;       // ticket price in USD
  isPast: boolean;     // true = already happened; false = upcoming
  accentColor: string; // hex colour for the card's left border
}

@Component({
  selector: 'app-root',
  standalone: true,
  // All pipes and directives are imported — you just need to apply them in the template
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, NgClass, NgStyle, EventCardComponent, FilterPipe, ExcerptPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly events: Event[] = [
    {
      id: 1,
      title: 'Angular Dev Summit',
      description: 'A two-day deep dive into modern Angular covering signals, zoneless rendering, and the latest tooling. Speakers from the core team and leading consultancies.',
      category: 'tech',
      date: '2026-08-12',
      price: 299,
      isPast: false,
      accentColor: '#6366f1'
    },
    {
      id: 2,
      title: 'Summer Jazz Festival',
      description: 'Three stages, fifteen acts, and two evenings under the open sky. Featuring artists from across the globe performing original compositions and jazz standards.',
      category: 'music',
      date: '2026-07-04',
      price: 45,
      isPast: false,
      accentColor: '#f59e0b'
    },
    {
      id: 3,
      title: 'City Half Marathon',
      description: 'A scenic 21km route through the historic city centre. All fitness levels welcome. Race pack includes timing chip, medal, and post-race refreshments.',
      category: 'sport',
      date: '2026-05-18',
      price: 35,
      isPast: true,
      accentColor: '#10b981'
    },
    {
      id: 4,
      title: 'Street Food Carnival',
      description: 'Sixty food vendors from twenty countries serving everything from artisan tacos to authentic Japanese ramen. Live cooking demonstrations throughout the day.',
      category: 'food',
      date: '2026-09-20',
      price: 12,
      isPast: false,
      accentColor: '#ef4444'
    },
    {
      id: 5,
      title: 'TypeScript Workshop',
      description: 'A hands-on full-day workshop covering TypeScript generics, utility types, and advanced patterns used in large-scale Angular and React applications.',
      category: 'tech',
      date: '2026-03-01',
      price: 149,
      isPast: true,
      accentColor: '#3b82f6'
    },
    {
      id: 6,
      title: 'Indie Music Showcase',
      description: 'An intimate venue showcase spotlighting ten emerging independent artists. Doors open at 7pm. All ticket proceeds go directly to the performing artists.',
      category: 'music',
      date: '2026-10-05',
      price: 25,
      isPast: false,
      accentColor: '#ec4899'
    }
  ];

  // Converts a category key to a human-readable label.
  // Used in the template because @let cannot be assigned conditionally inside @switch.
  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      music: '🎵 Music',
      sport: '🏃 Sport',
      tech: '💻 Tech',
      food: '🍜 Food'
    };
    return labels[category] ?? category;
  }
}
