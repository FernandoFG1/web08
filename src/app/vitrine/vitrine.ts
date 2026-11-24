import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class VitrineComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  lista: Produto[] = [];
  mensagem: string = '';

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.url, this.route.queryParams]).subscribe(([segments, params]) => {
      const ehPromo = segments.some(s => s.path === 'promo') || this.router.url.includes('promo');
      const termo = params['busca'] || '';
      if (termo.trim()) {
        this.buscarProdutos(termo.trim());
      } else {
        this.carregar(ehPromo);
      }
    });
  }

  private filtrarProdutos(dados: Produto[], ehPromo: boolean): Produto[] {
    if (ehPromo) {
      return dados.filter(p => (p.valorPromo || 0) > 0 && p.valorPromo < p.valor);
    }
    return dados;
  }

  carregar(ehPromo: boolean = false): void {
    this.service.carregarVitrine().subscribe({
      next: (dados) => {
        if (dados && dados.length > 0) {
          this.lista = this.filtrarProdutos(dados, ehPromo);
          this.cdr.detectChanges();
        } else {
          this.carregarTodos(ehPromo);
        }
      },
      error: () => {
        this.carregarTodos(ehPromo);
      }
    });
  }

  carregarTodos(ehPromo: boolean = false): void {
    this.service.listarTodos().subscribe({
      next: (dados) => {
        this.lista = this.filtrarProdutos(dados, ehPromo);
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Ocorreu um erro ao carregar os produtos. Tente mais tarde.';
        this.cdr.detectChanges();
      }
    });
  }

  buscarProdutos(termo: string): void {
    this.service.fazerBusca(termo).subscribe({
      next: (dados) => {
        this.lista = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Ocorreu um erro na busca. Tente mais tarde.';
        this.cdr.detectChanges();
      }
    });
  }

  adicionarEComprar(produto: Produto): void {
    if (isPlatformBrowser(this.platformId)) {
      const cestaSalva = localStorage.getItem('cesta_metalhorse');
      let cesta: Produto[] = cestaSalva ? JSON.parse(cestaSalva) : [];

      const itemExistente = cesta.find(p => p.codigo === produto.codigo);
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        cesta.push({ ...produto, quantidade: 1 });
      }

      localStorage.setItem('cesta_metalhorse', JSON.stringify(cesta));
    }

    this.router.navigate(['/cesta']);
  }
}