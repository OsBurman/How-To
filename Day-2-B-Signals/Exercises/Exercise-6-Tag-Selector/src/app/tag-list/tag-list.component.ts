import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent {

  // TODO 1: Declare readonly availableTags = input<string[]>([])
  //         This receives the list of tags from the parent

  // TODO 2: Declare readonly tagSelected = output<string>()
  //         This emits the selected tag name back to the parent

  // TODO 3: Implement onTagClick(tag: string): void
  //         Call this.tagSelected.emit(tag)
}
