/**
 * task-list.component.ts — Control Flow, @let, ng-container, ng-template, [ngClass]
 *
 * CONCEPTS DEMONSTRATED:
 * - @for with required track  — iterates over tasks; track item.id for DOM reuse
 * - @if / @else               — conditional rendering
 * - @let                      — template-local variable (Angular 18+); NOT a signal
 * - ng-container              — invisible grouping element; adds no DOM node
 * - ng-template               — deferred template block; rendered via NgTemplateOutlet
 * - [ngClass]                 — object, string, and array syntax for conditional CSS classes
 *
 * CLI command: ng generate component task-list
 */

import { Component } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

// Task interface — defined above the component class so it can be reused elsewhere
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgClass,          // required for [ngClass] directive in the template
    NgTemplateOutlet  // required for [ngTemplateOutlet] directive in the template
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  // Hard-coded sample data — in a real app this would come from a service (Day 3)
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

  // Controls whether to show the task list or the empty-state template demo
  showEmptyDemo = false;

  toggleEmptyDemo(): void {
    this.showEmptyDemo = !this.showEmptyDemo;
  }
}
