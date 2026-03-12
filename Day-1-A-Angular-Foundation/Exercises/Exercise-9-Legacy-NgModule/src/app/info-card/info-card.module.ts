// LEGACY feature module — declares and exports InfoCardComponent so other modules can use it.
// In modern Angular, this entire file is unnecessary — standalone: true on the component replaces it.
// Students will DELETE this file after converting to the modern pattern.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card.component';

@NgModule({
  // declarations — registers InfoCardComponent in this module
  declarations: [InfoCardComponent],
  // imports — CommonModule provides standard Angular directives
  imports: [CommonModule],
  // exports — makes InfoCardComponent available to any module that imports InfoCardModule
  exports: [InfoCardComponent]
})
export class InfoCardModule { }
