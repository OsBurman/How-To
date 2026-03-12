/**
 * task-list.component.ts — Legacy Task List
 *
 * LEGACY PATTERNS SHOWN:
 * - No standalone: true — declared in AppModule instead
 * - No imports array — NgModule handles all directive availability
 * - trackBy function for *ngFor performance (was optional; often forgotten)
 *
 * MODERN REPLACEMENTS:
 *   standalone: true + imports: [NgClass, NgTemplateOutlet]
 *   @for with required track (compiler enforces it — can't forget)
 *   @if / @else blocks instead of [ngIf] + <ng-template #else>
 *   @let instead of *ngIf="expr as name" workaround
 */

import { Component } from '@angular/core';

// Task interface — same shape as the modern version for easy comparison
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-task-list',
  // LEGACY: no standalone: true
  // LEGACY: no imports array — NgClass and NgTemplateOutlet come from CommonModule in AppModule
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  readonly tasks: Task[] = [
    {
      id: 1,
      title: 'Design the UI',
      description: 'Create wireframes and mockups for all screens',
      status: 'done',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Build Angular components',
      description: 'Scaffold AppComponent, TaskListComponent, and MovieListComponent',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Write unit tests',
      description: 'Cover all components and pipes with Jasmine specs',
      status: 'todo',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Set up CI pipeline',
      description: 'Configure GitHub Actions for automated builds',
      status: 'todo',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Deploy to staging',
      description: 'Push to a preview URL for stakeholder review',
      status: 'todo',
      priority: 'medium'
    }
  ];

  showEmptyDemo = false;

  toggleEmptyDemo(): void {
    this.showEmptyDemo = !this.showEmptyDemo;
  }

  // LEGACY: trackBy function required for *ngFor performance optimisation.
  // Tells Angular how to identify each item so DOM nodes can be reused.
  // PROBLEM: this was OPTIONAL — developers often forgot it, causing full list re-renders.
  // MODERN REPLACEMENT: track task.id inside @for — it is REQUIRED by the compiler.
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  // LEGACY: computed property used to avoid repeating the filter in the template.
  // *ngIf="expr as name" could capture a truthy value but couldn't express
  // a simple numeric derived value without this workaround.
  // MODERN REPLACEMENT: @let completedCount = tasks.filter(...).length
  get completedCount(): number {
    return this.tasks.filter(t => t.status === 'done').length;
  }
}
