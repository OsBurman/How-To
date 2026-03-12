/**
 * app.component.ts
 *
 * Root component for Exercise 3 — Task List with Control Flow.
 * This file is complete — no changes needed here.
 */

import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
