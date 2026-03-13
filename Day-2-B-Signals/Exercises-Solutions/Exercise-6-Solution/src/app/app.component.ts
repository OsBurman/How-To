import { Component, signal } from '@angular/core';
import { TagListComponent } from './tag-list/tag-list.component';

// The parent owns the selectedTags signal and passes availableTags down as a plain array.
// TagListComponent emits when a tag is clicked; the parent decides what to do with it.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TagListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  readonly availableTags: string[] = [
    'Angular', 'TypeScript', 'Signals', 'RxJS', 'CSS', 'HTML', 'Testing'
  ];

  // signal<string[]>([]) — starts as an empty array
  readonly selectedTags = signal<string[]>([]);

  onTagSelected(tag: string): void {
    // .update() receives the current array and returns a new one (immutable pattern).
    // Spread [...current, tag] creates a new array reference — required for signal detection.
    this.selectedTags.update(current => {
      if (current.includes(tag)) return current; // guard: no duplicates
      return [...current, tag];
    });
  }

  removeTag(tag: string): void {
    // .filter() creates a new array — signals detect the new reference and re-render
    this.selectedTags.update(current => current.filter(t => t !== tag));
  }
}
