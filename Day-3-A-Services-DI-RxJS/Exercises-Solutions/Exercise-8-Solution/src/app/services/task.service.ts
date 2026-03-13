import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {

  private readonly tasksBs$ = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Learn RxJS operators', completed: false },
    { id: 2, title: 'Build a service', completed: false }
  ]);

  private readonly errorBs$ = new BehaviorSubject<string | null>(null);

  readonly tasks$ = this.tasksBs$.asObservable();
  readonly error$ = this.errorBs$.asObservable();

  addTask(title: string): void {
    // Always clear any previous error before attempting a mutation.
    this.errorBs$.next(null);
    try {
      const current = this.tasksBs$.getValue();
      const newTask: Task = { id: Date.now(), title, completed: false };
      // Immutable update — never mutate the array stored in the BehaviorSubject.
      this.tasksBs$.next([...current, newTask]);
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to add task');
    }
  }

  completeTask(id: number): void {
    this.errorBs$.next(null);
    try {
      const current = this.tasksBs$.getValue();
      // map() returns a new array — the original is untouched.
      const updated = current.map(task =>
        task.id === id ? { ...task, completed: true } : task
      );
      this.tasksBs$.next(updated);
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to complete task');
    }
  }

  deleteTask(id: number): void {
    this.errorBs$.next(null);
    try {
      const current = this.tasksBs$.getValue();
      // filter() returns a new array without the deleted item.
      this.tasksBs$.next(current.filter(task => task.id !== id));
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }

  triggerCorruptTask(): void {
    try {
      const tasks = this.tasksBs$.getValue();
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
