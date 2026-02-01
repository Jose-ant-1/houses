import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import {CommonModule} from '@angular/common';

// En src/app/app.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent { // El nombre de la clase suele ser AppComponent
  title = 'homes';
}
