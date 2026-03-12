import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// TODO: Import FormsModule from '@angular/forms' and add it to the imports array

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    // TODO: Add FormsModule here — required for [(ngModel)] two-way binding
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {
  // ===== @Input — receives data from the parent =====

  // TODO: Add @Input() for the product name
  // @Input() productName: string = '';

  // ===== Component Properties =====

  // TODO: Add a displayTitle property — built in ngOnInit from the productName
  // displayTitle: string = '';

  // TODO: Add a comment property for two-way binding with the textarea
  // comment: string = '';

  // ===== @Output — sends feedback up to the parent =====

  // TODO: Add @Output() feedbackSubmitted with EventEmitter
  // The emitted object shape: { reviewer: string; product: string; comment: string; rating: number }
  // @Output() feedbackSubmitted = new EventEmitter<{ reviewer: string; product: string; comment: string; rating: number }>();

  // ===== Lifecycle Hook — ngOnInit =====

  // TODO: Build the displayTitle in ngOnInit (NOT the constructor!)
  // The @Input() value isn't available in the constructor — it's set after construction
  ngOnInit(): void {
    // this.displayTitle = 'Review: ' + this.productName;
  }

  // ===== Methods =====

  // TODO: Implement onSubmit() — receives the reviewer name and rating from template refs
  // onSubmit(reviewer: string, ratingStr: string): void {
  //   this.feedbackSubmitted.emit({
  //     reviewer: reviewer || 'Anonymous',
  //     product: this.productName,
  //     comment: this.comment,
  //     rating: parseInt(ratingStr, 10)
  //   });
  // }
}
