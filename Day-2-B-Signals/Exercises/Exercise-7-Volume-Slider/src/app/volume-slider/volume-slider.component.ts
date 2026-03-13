import { Component, model } from '@angular/core';

// model() creates a two-way signal binding between parent and child.
// Unlike input() which is read-only, model() is a WritableSignal —
// the child can call .set() on it and the change flows back up to the parent.
//
// TODO 1: Add the model import — it is already imported above.
//         Declare: readonly volume = model<number>(50);
//
// The parent passes the signal with [(volume)]="volume" (banana-in-a-box).
// Behind the scenes Angular generates a "volumeChange" output automatically.

@Component({
  selector: 'app-volume-slider',
  standalone: true,
  imports: [],
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.css'
})
export class VolumeSliderComponent {

  // TODO 1: Declare readonly volume = model<number>(50)
  //         model() is already imported above — add the property here.

  // TODO 2 (reflection): Add a comment below explaining the difference between
  //         model() and input() in your own words.
}
