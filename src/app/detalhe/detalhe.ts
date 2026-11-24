import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class DetalheComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  produto?: Produto;
  quantidadeDesejada: number = 1;
  mensagem: string = '';

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id') || this.route.snapshot.paramMap.get('codigo');
    const id = Number(param);

    if (id > 0) {
      this.service.buscarPorCodigo(id).subscribe({
        next: (dados) => {
          if (dados && dados.codigo) {
            this.produto = dados;
          } else {
            this.mensagem = 'Produto não encontrado.';
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagem = 'Erro ao carregar detalhes do produto.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  aumentarQtd(): void {
    this.quantidadeDesejada++;
  }

  diminuirQtd(): void {
    if (this.quantidadeDesejada > 1) {
      this.quantidadeDesejada--;
    }
  }

  comprar(): void {
    if (!this.produto) return;

    if (isPlatformBrowser(this.platformId)) {
      const cestaSalva = localStorage.getItem('cesta_metalhorse');
      let cesta: Produto[] = cestaSalva ? JSON.parse(cestaSalva) : [];

      const itemExistente = cesta.find(p => p.codigo === this.produto!.codigo);
      if (itemExistente) {
        itemExistente.quantidade += this.quantidadeDesejada;
      } else {
        cesta.push({
          ...this.produto,
          quantidade: this.quantidadeDesejada
        });
      }

      localStorage.setItem('cesta_metalhorse', JSON.stringify(cesta));
    }

    this.router.navigate(['/cesta']);
  }
}