import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Array of tasks added by the user
  tasks: { name: string; priority: string }[] = [];

  // Tracks the name of the most recently added task
  lastAdded: string = '';

  // Receives task name and priority from template ref values, adds to the array
  onAddTask(name: string, priority: string): void {
    if (name.trim().length === 0) {
      return; // Don't add empty tasks
    }
    this.tasks.push({ name, priority });
    this.lastAdded = name;
  }
}
