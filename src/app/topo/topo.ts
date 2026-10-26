import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BarraBusca } from '../barra-busca/barra-busca';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BarraBusca],
  templateUrl: './topo.html',
  styleUrl: './topo.css'
})
export class Topo {}