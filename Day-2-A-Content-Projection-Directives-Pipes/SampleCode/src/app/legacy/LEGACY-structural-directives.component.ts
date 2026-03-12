/**
 * ═══════════════════════════════════════════════════════════════════
 * ⚠️  LEGACY CODE — DO NOT USE IN NEW PROJECTS  ⚠️
 * ═══════════════════════════════════════════════════════════════════
 *
 * LEGACY-structural-directives.component.ts — Day 2 Part A Legacy Contrast
 *
 * PURPOSE: Shows the LEGACY structural directive syntax (*ngIf, *ngFor,
 * *ngSwitch) that modern Angular's @if, @for, and @switch replaced.
 * Students read this to understand what legacy code looks like and WHY
 * the modern control flow syntax is better.
 *
 * THIS FILE IS READ-ONLY REFERENCE. Students do not run this code.
 *
 * WHAT CHANGED AND WHY:
 * ─────────────────────────────────────────────────────────────────
 * Legacy *ngIf        → Modern @if / @else
 *   Pain: Required ng-template + #ref for else blocks; verbose syntax
 *   Fix:  @if reads like normal code; @else is inline
 *
 * Legacy *ngFor       → Modern @for (with required track)
 *   Pain: trackBy was optional — easy to forget, causing DOM re-renders
 *   Fix:  track is required in @for — you can't skip it
 *
 * Legacy *ngSwitch    → Modern @switch / @case
 *   Pain: Required [ngSwitch] on parent + *ngSwitchCase on each child
 *   Fix:  @switch reads like a JavaScript switch statement
 *
 * Legacy *ngIf="expr as name" → Modern @let name = expr
 *   Pain: Mixed conditional rendering with variable assignment
 *   Fix:  @let separates the variable from the condition — clearer intent
 * ─────────────────────────────────────────────────────────────────
 *
 * NOTE: This component would need NgModule + CommonModule to compile.
 * It is shown here for comparison only.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Task interface — same shape as the modern version */
interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

@Component({
  selector: 'app-legacy-structural',
  standalone: true,
  imports: [CommonModule], // Legacy code in NgModule-era used CommonModule in the NgModule
  templateUrl: './LEGACY-structural-directives.component.html',
  styleUrl: './LEGACY-structural-directives.component.css'
})
export class LegacyStructuralDirectivesComponent {

  /** Same task data as the modern version */
  tasks: Task[] = [
    { id: 1, title: 'Set up project', status: 'done' },
    { id: 2, title: 'Build header component', status: 'in-progress' },
    { id: 3, title: 'Add routing', status: 'todo' }
  ];

  /** User object to demonstrate *ngIf="expr as name" pattern */
  currentUser: { name: string; role: string } | null = {
    name: 'Alice',
    role: 'Developer'
  };

  /**
   * Legacy trackBy function — required as a separate method for *ngFor.
   *
   * In modern @for, you write: @for (task of tasks; track task.id)
   * In legacy *ngFor, you had to define this method AND wire it:
   *   *ngFor="let task of tasks; trackBy: trackByTaskId"
   *
   * The problem? trackBy was OPTIONAL. Most beginners skipped it,
   * causing Angular to destroy and recreate every DOM element on change.
   */
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
