import { Component } from '@angular/core';
import { Message } from './message.model';

// SOLUTION: Converted from standalone to legacy NgModule-declared component.
// Changes made:
//   1. Removed standalone: true — this component is now declared in AppModule
//   2. Removed imports: [...] — dependencies are provided by the module, not the component
//   3. Changed styleUrl (singular) to styleUrls (plural array) — legacy syntax
// Notice: FormsModule and MessageCardComponent are NO LONGER imported here.
// They're imported in AppModule instead. That's the legacy pain — you can't tell
// from looking at this file what dependencies it actually uses.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // New message form — two-way bound via [(ngModel)]
  newAuthor: string = '';
  newText: string = '';

  // Message board data
  messages: Message[] = [
    {
      id: 1,
      author: 'Alice',
      text: 'Just learned about standalone components — so much cleaner than NgModules!',
      likes: 3,
      liked: false,
      postedAt: '10:30 AM'
    },
    {
      id: 2,
      author: 'Bob',
      text: 'The modern Angular patterns really simplify things. No more hunting through modules.',
      likes: 5,
      liked: true,
      postedAt: '10:45 AM'
    },
    {
      id: 3,
      author: 'Charlie',
      text: 'Template syntax is the same either way — but the component setup is way better now.',
      likes: 1,
      liked: false,
      postedAt: '11:00 AM'
    }
  ];

  // Track the next available ID for new messages
  private nextId: number = 4;

  // Handle like toggle from child component
  onToggleLike(id: number): void {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.liked = !message.liked;
      message.likes += message.liked ? 1 : -1;
    }
  }

  // Add a new message from the form
  addMessage(): void {
    if (this.newText.trim().length === 0) {
      return;
    }
    const message: Message = {
      id: this.nextId++,
      author: this.newAuthor.trim() || 'Anonymous',
      text: this.newText.trim(),
      likes: 0,
      liked: false,
      postedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.unshift(message);
    // Clear the form
    this.newAuthor = '';
    this.newText = '';
  }
}
