import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeatureListComponent } from './feature-list/feature-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, HeroSectionComponent, FeatureListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
