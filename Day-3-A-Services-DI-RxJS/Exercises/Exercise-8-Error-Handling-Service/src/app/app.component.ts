import { Component, inject, signal } from '@angular/core';
import { TaskService, Task } from './services/task.service';
// TODO 1: Import toSignal from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  private readonly taskService = inject(TaskService);

  // TODO 2: Replace these stub signals with real toSignal() conversions.
  //
  // tasks should be:
  //   readonly tasks = toSignal(this.taskService.tasks$, { initialValue: [] as Task[] });
  //
  // error should be:
  //   readonly error = toSignal(this.taskService.error$, { initialValue: null });
  //
  // Why initialValue? toSignal() normally returns Signal<T | undefined> because the
  // Observable might not have emitted yet. Providing initialValue tells Angular
  // "use this until the first emission" — making the type Signal<T> with no undefined.
  readonly tasks = signal<Task[]>([]);
  readonly error = signal<string | null>(null);

  // Holds the value of the new task input field.
  newTaskTitle = '';

  // TODO 3: Implement these three handlers. Each one calls the matching service method.
  addTask(): void {
    // TODO: call this.taskService.addTask(this.newTaskTitle), then clear this.newTaskTitle
  }

  completeTask(id: number): void {
    // TODO: call this.taskService.completeTask(id)
  }

  deleteTask(id: number): void {
    // TODO: call this.taskService.deleteTask(id)
  }

  triggerCorruptTask(): void {
    this.taskService.triggerCorruptTask();
  }
}
