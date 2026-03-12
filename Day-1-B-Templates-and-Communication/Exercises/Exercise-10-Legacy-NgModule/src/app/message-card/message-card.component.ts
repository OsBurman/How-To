// LEGACY MessageCardComponent — declared in AppModule, not standalone.
// Notice there is no indication in this file that FormsModule exists anywhere.
// Students will convert this to a modern standalone component.
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';

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
