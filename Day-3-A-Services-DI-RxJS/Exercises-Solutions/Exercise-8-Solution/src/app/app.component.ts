import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskService, Task } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {

  private readonly taskService = inject(TaskService);

  // toSignal() with initialValue avoids undefined — the signal has a value immediately.
  // Signal<Task[]> instead of Signal<Task[] | undefined>.
  readonly tasks = toSignal(this.taskService.tasks$, { initialValue: [] as Task[] });

  // initialValue: null means the type is Signal<string | null> — no undefined.
  // The template uses @if (error() !== null) to show the banner.
  readonly error = toSignal(this.taskService.error$, { initialValue: null });

  newTaskTitle = '';

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  triggerCorruptTask(): void {
    this.taskService.triggerCorruptTask();
  }
}
