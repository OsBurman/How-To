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

  // The parent owns the volume signal — passes it into VolumeSliderComponent via model()
  readonly volume = signal<number>(50);

  mute(): void {
    // set(0) updates the parent's signal — because model() creates two-way binding,
    // this change flows DOWN into VolumeSliderComponent and moves the slider to 0
    this.volume.set(0);
  }
}
