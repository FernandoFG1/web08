import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Produto } from '../model/produto';
@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class CestaComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  cesta: Produto[] = [];
  pedidoFinalizado: boolean = false; 
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.carregarCesta();
  }
  carregarCesta(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cestaSalva = localStorage.getItem('cesta_metalhorse');
      if (cestaSalva) {
        this.cesta = JSON.parse(cestaSalva);
      }
    }
  }
  salvarEAtualizar(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cesta_metalhorse', JSON.stringify(this.cesta));
    }
    this.cdr.detectChanges();
  }
  alterarQuantidade(index: number, delta: number): void {
    this.cesta[index].quantidade += delta;
    if (this.cesta[index].quantidade <= 0) {
      this.cesta.splice(index, 1);
    }
    this.salvarEAtualizar();
  }
  removerItem(index: number): void {
    this.cesta.splice(index, 1);
    this.salvarEAtualizar();
  }
  limparCesta(): void {
    this.cesta = [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cesta_metalhorse');
    }
    this.cdr.detectChanges();
  }
  get total(): number {
    return this.cesta.reduce((acc, item) => {
      const preco = item.valorPromo > 0 ? item.valorPromo : item.valor;
      return acc + (preco * item.quantidade);
    }, 0);
  }
  fecharPedido(): void {
    this.pedidoFinalizado = true;
    this.cdr.detectChanges(); 
  }
  concluirEPagar(): void {
    this.pedidoFinalizado = false;
    this.limparCesta();
    this.router.navigate(['/vitrine']);
  }
}