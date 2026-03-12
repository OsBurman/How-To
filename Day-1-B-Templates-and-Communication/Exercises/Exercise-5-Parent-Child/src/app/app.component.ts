import { Component } from '@angular/core';
// TODO (Step 9): Import ColorSwatchComponent so you can add it to the imports array

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO (Step 9): Add ColorSwatchComponent here
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

  // TODO (Step 7): Implement onColorSelected(color: string)
  // Set this.selectedColor to the received color name
}
