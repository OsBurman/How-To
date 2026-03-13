import { Component, signal } from '@angular/core';
import { TagListComponent } from './tag-list/tag-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // All available tags — passed down to TagListComponent as an input
  readonly availableTags: string[] = [
    'Angular', 'TypeScript', 'Signals', 'RxJS', 'CSS', 'HTML', 'Testing'
  ];

  // TODO 1: Declare readonly selectedTags = signal<string[]>([])
  //         This holds the tags the user has selected

  // TODO 2: Implement onTagSelected(tag: string): void
  //         Add the tag to selectedTags using .update() with the spread pattern
  //         Only add it if it is not already in the array (check with .includes())

  // TODO 3: Implement removeTag(tag: string): void
  //         Remove the tag from selectedTags using .update() with .filter()
}
