import { Component } from '@angular/core';
// TODO (Step 2): Import Input and Output and EventEmitter from '@angular/core'

@Component({
  selector: 'app-color-swatch',
  standalone: true,
  imports: [],
  templateUrl: './color-swatch.component.html',
  styleUrl: './color-swatch.component.css'
})
export class ColorSwatchComponent {
  // TODO (Step 2): Add @Input() colorName: string = '';
  // This receives the color name from the parent

  // TODO (Step 2): Add @Input() hexCode: string = '#000000';
  // This receives the hex color code from the parent

  // TODO (Step 3): Add @Output() colorSelected = new EventEmitter<string>();
  // This emits the selected color name to the parent

  // TODO (Step 4): Implement onSelect() method
  // It should call this.colorSelected.emit(this.colorName)
}
