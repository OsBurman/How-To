import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-swatch',
  standalone: true,
  imports: [],
  templateUrl: './color-swatch.component.html',
  styleUrl: './color-swatch.component.css'
})
export class ColorSwatchComponent {
  // @Input(): receives the color name from the parent via property binding
  @Input() colorName: string = '';

  // @Input(): receives the hex color code from the parent via property binding
  @Input() hexCode: string = '#000000';

  // @Output(): emits the selected color name to the parent when clicked
  @Output() colorSelected = new EventEmitter<string>();

  // Called when the user clicks the swatch — emits the color name
  onSelect(): void {
    this.colorSelected.emit(this.colorName);
  }
}
