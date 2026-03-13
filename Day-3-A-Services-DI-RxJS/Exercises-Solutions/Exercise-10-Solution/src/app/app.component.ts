import { Component } from '@angular/core';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedFormComponent } from './feed-form/feed-form.component';

// MODERN: standalone: true — no NgModule declaration needed.
// imports: [...] replaces the NgModule declarations array for this component.
// Angular resolves <app-feed-form> and <app-feed-list> from the imports array directly.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedListComponent, FeedFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
