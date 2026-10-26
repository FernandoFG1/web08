import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { BarraBusca } from './barra-busca/barra-busca';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BarraBusca],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web04');
}