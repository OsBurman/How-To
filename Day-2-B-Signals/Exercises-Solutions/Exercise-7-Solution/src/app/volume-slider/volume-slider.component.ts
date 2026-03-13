import { Component, model } from '@angular/core';

// model() creates a two-way signal binding between parent and child.
//
// How it differs from input():
//   input() is READ-ONLY — the parent writes, the child can only read.
//   model() is WRITABLE — the child can call .set() and the new value
//   flows BACK UP to the parent. This is what makes [(volume)]="volume" work.
//
// Behind the scenes, Angular generates a "volumeChange" output event automatically.
// That's the write-back channel.

@Component({
  selector: 'app-volume-slider',
  standalone: true,
  imports: [],
  templateUrl: './volume-slider.component.html',
  styleUrl: './volume-slider.component.css'
})
export class VolumeSliderComponent {

  // model<number>(50) — starts at 50; parent can override with [(volume)]="volume"
  readonly volume = model<number>(50);
}
