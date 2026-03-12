import { Component } from '@angular/core';
// TODO (Step 3): Import FormsModule from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO (Step 4): Add FormsModule here so [(ngModel)] works
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
