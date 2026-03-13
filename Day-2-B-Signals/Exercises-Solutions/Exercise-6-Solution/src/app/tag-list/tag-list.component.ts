import { Component, input, output } from '@angular/core';

// input() receives data from the parent — read-only inside this component.
// output() replaces @Output() + EventEmitter — cleaner declaration, same .emit() API.

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent {

  // input<string[]>([]) — default is an empty array if the parent doesn't bind it
  readonly availableTags = input<string[]>([]);

  // output<string>() — emits a tag name string when a button is clicked
  readonly tagSelected = output<string>();

  onTagClick(tag: string): void {
    // .emit() sends the value up to the parent — Angular routes it to (tagSelected)="..."
    this.tagSelected.emit(tag);
  }
}
