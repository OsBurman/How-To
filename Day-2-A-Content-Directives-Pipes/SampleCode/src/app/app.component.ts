/**
 * app.component.ts — Root Component
 *
 * AppComponent is the shell that composes all four demo components.
 * Each child component focuses on one concept group from Day 2 Part A.
 *
 * STANDALONE COMPONENTS PATTERN:
 * In modern Angular, each standalone component declares its own dependencies
 * in its imports array. There is no NgModule to register components in.
 * AppComponent simply imports the child components it uses in its template.
 *
 * CLI command: created automatically by ng new
 */

import { Component } from '@angular/core';
import { CardComponent }       from './card/card.component';
import { LayoutCardComponent } from './layout-card/layout-card.component';
import { TaskListComponent }   from './task-list/task-list.component';
import { MovieListComponent }  from './movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,        // no NgModule needed
  imports: [
    CardComponent,         // demonstrates single-slot ng-content
    LayoutCardComponent,   // demonstrates named ng-content slots + ngAfterContentInit
    TaskListComponent,     // demonstrates @for, @if/@else, @let, ng-container, ng-template, [ngClass]
    MovieListComponent     // demonstrates @switch, [ngStyle], pipes, async
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'D2A — Content Projection, Directives & Pipes';
}
