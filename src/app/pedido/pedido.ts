import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido as PedidoModel } from '../model/pedido';
import { PedidoService } from '../service/pedido-service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido {
  private cdr = inject(ChangeDetectorRef);

  obj: PedidoModel = new PedidoModel();
  codigoBusca: number = 0;
  mensagem: string = '';

  constructor(private service: PedidoService) {}

  buscar(): void {
    if (this.codigoBusca > 0) {
      this.service.buscarPorCodigo(this.codigoBusca).subscribe({
        next: (dados) => {
          if (dados && dados.codigoPedido) {
            this.obj = dados;
            this.mensagem = `Pedido #${dados.codigoPedido} encontrado.`;
          } else {
            this.obj = new PedidoModel();
            this.mensagem = 'Pedido não encontrado!';
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagem = 'Erro ao consultar pedido.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  alterar(): void {
    this.service.alterar(this.obj).subscribe({
      next: (dados) => {
        this.mensagem = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao alterar pedido.';
        this.cdr.detectChanges();
      }
    });
  }

  excluir(): void {
    if (this.obj.codigoPedido > 0) {
      this.service.excluir(this.obj.codigoPedido).subscribe({
        next: (dados) => {
          this.mensagem = dados;
          this.obj = new PedidoModel();
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagem = 'Erro ao excluir pedido.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}