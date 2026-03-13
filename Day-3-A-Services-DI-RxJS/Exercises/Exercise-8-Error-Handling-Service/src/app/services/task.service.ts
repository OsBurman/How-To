import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// The shape of a task object. Define the interface before the service that uses it.
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  // tasks$ holds the current task list. BehaviorSubject replays the latest value
  // to any new subscriber — perfect for state that components need immediately.
  private readonly tasksBs$ = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Learn RxJS operators', completed: false },
    { id: 2, title: 'Build a service', completed: false }
  ]);

  // error$ holds the current error message, or null when there is no error.
  private readonly errorBs$ = new BehaviorSubject<string | null>(null);

  // Expose read-only Observables to consumers. Components never call .next() directly.
  readonly tasks$ = this.tasksBs$.asObservable();
  readonly error$ = this.errorBs$.asObservable();

  // TODO 1: Implement addTask.
  //   - Clear any existing error first: this.errorBs$.next(null)
  //   - Wrap the logic in try/catch
  //   - In the try block, create a new Task object with a generated id, the given title, completed: false
  //   - Use an immutable update: this.tasksBs$.next([...current, newTask])
  //   - In the catch block, push the error message: this.errorBs$.next('Failed to add task: ...')
  //
  // Hint for generating an id:
  //   const id = Date.now();
  addTask(title: string): void {
    // TODO: implement
  }

  // TODO 2: Implement completeTask.
  //   - Clear any existing error first
  //   - Wrap in try/catch
  //   - In the try block, map over the current tasks array.
  //     For the task with the matching id, return { ...task, completed: true }.
  //     For all other tasks, return them unchanged.
  //   - Call this.tasksBs$.next(updated) with the mapped array
  //
  // Hint:
  //   const updated = current.map(task => task.id === id ? { ...task, completed: true } : task);
  completeTask(id: number): void {
    // TODO: implement
  }

  // TODO 3: Implement deleteTask.
  //   - Clear any existing error first
  //   - Wrap in try/catch
  //   - In the try block, filter out the task with the given id
  //   - Call this.tasksBs$.next(filtered) with the result
  deleteTask(id: number): void {
    // TODO: implement
  }

  // This method deliberately throws to demonstrate error$ catching and displaying errors.
  // You do not need to modify it — just call it from AppComponent.
  triggerCorruptTask(): void {
    try {
      const tasks = this.tasksBs$.getValue();
      // Simulate a corrupt task slipping through validation
      const corrupt = { id: -1, title: null as unknown as string, completed: false };
      if (corrupt.title === null) {
        throw new Error('Task title cannot be null — data corruption detected');
      }
      this.tasksBs$.next([...tasks, corrupt]);
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Unknown error');
    }
  }
}
