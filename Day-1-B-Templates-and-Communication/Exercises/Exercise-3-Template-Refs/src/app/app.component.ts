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

  // TODO (Step 5): Implement the onAddTask(name, priority) method.
  // - Push { name, priority } into this.tasks
  // - Set this.lastAdded to the task name
  // - Only add if name is not empty (optional bonus)
}
