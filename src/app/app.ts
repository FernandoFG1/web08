import { Component } from '@angular/core';
import { Topo } from './topo/topo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Topo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'web04';
}