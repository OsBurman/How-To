import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// SOLUTION: Import FormsModule — required for [(ngModel)] two-way binding
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    // SOLUTION: Add FormsModule — without it, [(ngModel)] won't work
    FormsModule
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {
  // ===== @Input — receives data from the parent =====

  // SOLUTION: @Input() receives the product name from the parent via [productName]="..."
  @Input() productName: string = '';

  // ===== Component Properties =====

  // SOLUTION: displayTitle is built in ngOnInit from the productName @Input()
  displayTitle: string = '';

  // SOLUTION: comment is two-way bound to the textarea via [(ngModel)]
  comment: string = '';

  // ===== @Output — sends feedback up to the parent =====

  // SOLUTION: @Output() emits the feedback object when the form is submitted
  @Output() feedbackSubmitted = new EventEmitter<{
    reviewer: string;
    product: string;
    comment: string;
    rating: number;
  }>();

  // ===== Lifecycle Hook — ngOnInit =====

  // SOLUTION: Build the displayTitle in ngOnInit
  // The @Input() value isn't available in the constructor — it's set after construction
  ngOnInit(): void {
    this.displayTitle = 'Review: ' + this.productName;
  }

  // ===== Methods =====

  // SOLUTION: Receives reviewer name and rating from template ref variables,
  // combines with two-way-bound comment, and emits the complete feedback object
  onSubmit(reviewer: string, ratingStr: string): void {
    this.feedbackSubmitted.emit({
      reviewer: reviewer || 'Anonymous',
      product: this.productName,
      comment: this.comment,
      rating: parseInt(ratingStr, 10)
    });
  }
}
