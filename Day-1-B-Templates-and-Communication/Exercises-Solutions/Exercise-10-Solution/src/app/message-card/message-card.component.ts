// SOLUTION: Converted from legacy NgModule-declared to modern standalone component.
// Changes made:
//   1. Added standalone: true — this component manages its own dependencies
//   2. Added imports: [] — no template dependencies (no directives or other components used)
//   3. Changed styleUrls (plural array) to styleUrl (singular string) — modern syntax
// The component logic is IDENTICAL — only the decorator metadata changed.
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent implements OnInit {
  // Receives a message from the parent via property binding
  @Input() message: Message | null = null;

  // Emits the message ID when the like button is clicked
  @Output() toggleLike = new EventEmitter<number>();

  // Formatted display name — built in ngOnInit
  displayAuthor: string = '';

  // Lifecycle hook — runs after Angular sets the @Input() values
  ngOnInit(): void {
    this.displayAuthor = this.message?.author
      ? `📝 ${this.message.author}`
      : '📝 Anonymous';
  }

  // Handle the like button click — emit the message ID to the parent
  onLike(): void {
    if (this.message) {
      this.toggleLike.emit(this.message.id);
    }
  }
}
