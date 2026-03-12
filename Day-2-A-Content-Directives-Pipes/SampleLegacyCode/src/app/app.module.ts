/**
 * app.module.ts — Root NgModule
 *
 * LEGACY PATTERN: NgModule
 *
 * Every component, pipe, and directive used in the app must be listed in
 * the 'declarations' array. Every external Angular module (BrowserModule,
 * CommonModule, FormsModule) must be listed in 'imports'.
 *
 * The pain: if you forget to declare a component, you get a cryptic
 * "not a known element" error. If two modules both declare the same
 * component, Angular throws an error. Everything has to be explicitly wired.
 *
 * MODERN REPLACEMENT:
 * - No NgModule needed.
 * - Each standalone component lists its own imports directly.
 * - No central registration file.
 * - The @Component decorator is self-contained.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // includes NgIf, NgFor, NgSwitch, NgClass, NgStyle, DatePipe, CurrencyPipe, UpperCasePipe, AsyncPipe

import { AppComponent }        from './app.component';
import { TaskListComponent }   from './task-list/task-list.component';
import { MovieListComponent }  from './movie-list/movie-list.component';
import { FilterPipe }          from './pipes/filter.pipe';
import { TruncatePipe }        from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    // LEGACY: every component and pipe MUST be declared here before it can be used.
    // Forget one and you get "not a known element" or "has no exported member".
    AppComponent,
    TaskListComponent,
    MovieListComponent,
    FilterPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,  // required for browser bootstrapping and common DOM directives
    CommonModule    // provides NgIf, NgFor, NgSwitch, NgClass, NgStyle + built-in pipes
    // MODERN: individual directives/pipes are imported per-component, not here
  ],
  bootstrap: [AppComponent] // the component Angular renders into index.html's <app-root>
})
export class AppModule {}
