/**
 * task-list.component.ts
 *
 * CONCEPTS: @if / @else, ng-template, @for with track, ng-container, @let
 *
 * TASKS (all work is in task-list.component.html):
 * 1. Add FilterPipe to the imports array so the template can use it.
 * 2. In the template, add @let, @if/@else, @for, and ng-container as described.
 *
 * This file already has the Task interface, sample data, and a FilterPipe import stub.
 * You only need to uncomment FilterPipe in the imports array below.
 */

import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';

// Task interface — defines the shape of each task object
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;  // ISO date string — e.g. '2026-04-15'
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgTemplateOutlet,  // needed for [ngTemplateOutlet] in the else block
    // TODO: add FilterPipe here so the template can use | filter
    FilterPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  // Sample task data — already provided
  // To test the empty state: temporarily set this to []
  readonly tasks: Task[] = [
    { id: 1, title: 'Set up Angular workspace',  completed: true,  dueDate: '2026-03-01' },
    { id: 2, title: 'Build AlertBoxComponent',   completed: true,  dueDate: '2026-03-05' },
    { id: 3, title: 'Add named ng-content slots', completed: false, dueDate: '2026-03-10' },
    { id: 4, title: 'Practice @for with track',  completed: false, dueDate: '2026-03-12' },
    { id: 5, title: 'Build a custom pipe',        completed: false, dueDate: '2026-03-15' },
  ];

}
