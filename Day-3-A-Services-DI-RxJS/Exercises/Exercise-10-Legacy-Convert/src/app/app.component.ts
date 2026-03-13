import { Component } from '@angular/core';

// LEGACY: No standalone: true and no imports array.
// This component is registered via AppModule's declarations array.
//
// TODO Step 1: Add  standalone: true  to the @Component decorator.
// TODO Step 4: Add  imports: [FeedListComponent, FeedFormComponent]  to the @Component decorator.
//              Once you do that, Angular no longer needs AppModule to resolve these selectors.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
