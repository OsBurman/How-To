import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';

// SOLUTION: Converted from standalone to legacy NgModule-declared component.
// Changes made:
//   1. Removed standalone: true — this component is now declared in AppModule
//   2. Removed imports: [] — no longer needed (was empty anyway, but the property itself is removed)
//   3. Changed styleUrl (singular) to styleUrls (plural array) — legacy syntax
// The component logic is IDENTICAL — only the decorator metadata changed.
// That's the key takeaway: legacy vs modern is about how components are organized,
// not about how they work internally.
@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
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
