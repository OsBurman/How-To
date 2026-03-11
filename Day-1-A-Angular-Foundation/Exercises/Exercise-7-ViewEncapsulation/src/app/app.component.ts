import { Component } from '@angular/core';
import { StyledBoxComponent } from './styled-box/styled-box.component';
import { UnstyledBoxComponent } from './unstyled-box/unstyled-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StyledBoxComponent, UnstyledBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
