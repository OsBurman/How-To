import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule // Required for [(ngModel)] two-way binding
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // The user's message — will be bound to the textarea via [(ngModel)]
  message: string = '';

  // Maximum recommended character count
  maxLength: number = 100;
}
