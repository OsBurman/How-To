import { Component } from '@angular/core';
import { ColorSwatchComponent } from './color-swatch/color-swatch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ColorSwatchComponent // Register child so <app-color-swatch> works in template
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Array of colors to display as swatches
  colors: { name: string; hex: string }[] = [
    { name: 'Crimson', hex: '#DC143C' },
    { name: 'Ocean Blue', hex: '#0077B6' },
    { name: 'Forest Green', hex: '#228B22' },
    { name: 'Sunset Orange', hex: '#FF6F00' },
    { name: 'Royal Purple', hex: '#7B2D8E' }
  ];

  // Tracks which color the user has selected
  selectedColor: string = '';

  // Receives the color name from the child's @Output event
  onColorSelected(color: string): void {
    this.selectedColor = color;
  }
}
