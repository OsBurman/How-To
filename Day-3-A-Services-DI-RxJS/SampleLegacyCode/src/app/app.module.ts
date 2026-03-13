// AppModule — the legacy way to configure an Angular application.
//
// MODERN equivalent: app.config.ts + bootstrapApplication()
//   Modern Angular uses standalone components and provideRouter([]) in app.config.ts.
//   There is NO AppModule — standalone components declare their own imports.
//
// LEGACY pattern:
//   Every component must be listed in declarations[].
//   Every third-party Angular module (RouterModule, CommonModule) must be listed in imports[].
//   Services can be listed in providers[] (or use providedIn: 'root', which still works).
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent }       from './app.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { CartPageComponent }   from './cart-page/cart-page.component';

// CartService is @Injectable({ providedIn: 'root' }) so it does NOT need to
// appear in providers[] here. Both modern and legacy apps support providedIn: 'root'.
// The difference is how components are registered and how modules are declared.

@NgModule({
  declarations: [
    // EVERY component used in this app must be listed here.
    // Modern standalone components don't need this — they register themselves.
    AppComponent,
    CartHeaderComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,   // required for legacy apps; provides NgIf, NgFor, AsyncPipe via CommonModule
    CommonModule     // provides NgIf, NgFor, NgClass, AsyncPipe etc.
  ],
  providers: [
    // CartService is NOT listed here because it uses providedIn: 'root'.
    // If it did NOT use providedIn: 'root', it would be listed here.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
