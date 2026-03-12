import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';

// MODERN: standalone component with explicit imports.
// FormsModule is NOT needed here — this component has no [(ngModel)].
// After converting to legacy NgModule:
//   - Remove standalone: true
//   - Remove the imports array
//   - Change styleUrl to styleUrls (plural array)
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
    // Build the display name — demonstrates that ngOnInit has access to @Input() values
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
