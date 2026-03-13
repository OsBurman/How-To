import { Component, signal } from '@angular/core';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VolumeSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // The parent owns the volume signal — passed into the child via model() two-way binding
  // NOTE: Pass the signal reference (not volume()) in the template: [(volume)]="volume"
  readonly volume = signal<number>(50);

  // TODO: Implement mute(): void
  //       Call this.volume.set(0) to reset volume to 0
  //       This will flow DOWN into the child component via model() and move the slider
  mute(): void {
    // TODO: this.volume.set(0);
  }
}
