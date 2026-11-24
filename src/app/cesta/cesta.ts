import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Cesta } from '../model/cesta';
import { Pedido } from '../model/pedido';
import { PedidoService } from '../service/pedido-service';

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
  codigoPedidoGerado: number = 0;
  mensagem: string = '';

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {}

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
      const preco = (prod.valorPromo || 0) > 0 ? prod.valorPromo : prod.valor;
      return acc + (preco * item.quantidade);
    }, 0);
  }

  fecharPedido(): void {
    const novoPedido = new Pedido();
    novoPedido.codigoPedido = 0;
    novoPedido.valorTotal = this.total;
    novoPedido.dataPedido = new Date().toISOString().split('T')[0];
    novoPedido.entrega = 'Padrão';
    novoPedido.obs = 'Pedido realizado via loja virtual';

    if (isPlatformBrowser(this.platformId)) {
      const clienteSalvo = localStorage.getItem('cadastro');
      if (clienteSalvo) {
        const cliente = JSON.parse(clienteSalvo);
        novoPedido.codigoCliente = cliente.codigo || 0;
      }
    }

    this.pedidoService.gravar(novoPedido).subscribe({
      next: (dados: string) => {
        const match = dados.match(/\d+/);
        this.codigoPedidoGerado = match ? Number(match[0]) : 1;
        this.mensagem = dados;
        this.pedidoFinalizado = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao registrar o pedido no servidor.';
        this.cdr.detectChanges();
      }
    });
  }

  concluirEPagar(): void {
    this.pedidoFinalizado = false;
    this.limparCesta();
    this.router.navigate(['/vitrine']);
  }
}