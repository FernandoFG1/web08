import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barra-busca.html',
  styleUrl: './barra-busca.css'
})
export class BarraBusca implements OnInit {
  termoBusca: string = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
    const termoSalvo = localStorage.getItem('termoBusca');
    if (termoSalvo) {
      this.termoBusca = termoSalvo;
    }
  }
  salvarNoStorage(): void {
    localStorage.setItem('termoBusca', this.termoBusca);
  }
  buscar(): void {
    const termoFormatado = this.termoBusca ? this.termoBusca.trim() : '';
    this.router.navigate(['/vitrine'], {
      queryParams: { busca: termoFormatado }
    });
  }
}