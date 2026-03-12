// LEGACY feature module — declares and exports BannerComponent so other modules can use it.
// In modern Angular, this entire file is unnecessary — standalone: true on the component replaces it.
// Students will DELETE this file after converting to the modern pattern.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';

@NgModule({
  // declarations — registers BannerComponent in this module
  declarations: [BannerComponent],
  // imports — CommonModule provides standard Angular directives (*ngIf, *ngFor, pipes)
  imports: [CommonModule],
  // exports — makes BannerComponent available to any module that imports BannerModule
  exports: [BannerComponent]
})
export class BannerModule { }
