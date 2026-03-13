import { Component } from '@angular/core';

// TODO 1: Add input and computed to the import above
//         import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  standalone: true,
  templateUrl: './rating-display.component.html',
  styleUrl: './rating-display.component.css'
})
export class RatingDisplayComponent {

  // TODO 2: Declare readonly rating = input<number>(0)
  //         This accepts the current rating value from the parent component

  // TODO 3: Declare readonly maxStars = input<number>(5)
  //         This controls how many stars to render

  // TODO 4: Declare readonly label = input.required<string>()
  //         This is a required label displayed above the stars
  //         (no default value — the parent MUST provide it)

  // TODO 5: Declare readonly stars = computed(...)
  //         Return an array of objects, one per star: { filled: boolean }
  //         A star is filled when its index is less than the rating
  //         Hint:
  //         Array.from({ length: this.maxStars() }, (_, i) => ({
  //           filled: i < this.rating()
  //         }))
}
