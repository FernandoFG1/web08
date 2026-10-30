import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Cesta } from '../model/cesta';

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
  cestaModel: Cesta = new Cesta();
  pedidoFinalizado: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarCesta();
  }

  get cesta(): any[] {
    return this.cestaModel.itens;
  }

  carregarCesta(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cestaSalva = localStorage.getItem('cesta_metalhorse');
      if (cestaSalva) {
        this.cestaModel.itens = JSON.parse(cestaSalva);
      }
    }
  }

  salvarEAtualizar(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cesta_metalhorse', JSON.stringify(this.cestaModel.itens));
    }
    this.cdr.detectChanges();
  }

  alterarQuantidade(index: number, delta: number): void {
    this.cestaModel.itens[index].quantidade += delta;
    if (this.cestaModel.itens[index].quantidade <= 0) {
      this.cestaModel.removerItem(index);
    }
    this.salvarEAtualizar();
  }

  removerItem(index: number): void {
    this.cestaModel.removerItem(index);
    this.salvarEAtualizar();
  }

  limparCesta(): void {
    this.cestaModel.itens = [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cesta_metalhorse');
    }
    this.cdr.detectChanges();
  }

  get total(): number {
    return this.cestaModel.itens.reduce((acc, item: any) => {
      const prod = item.produto || item;
      const preco = prod.valorPromo > 0 ? prod.valorPromo : prod.valor;
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