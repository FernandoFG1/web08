import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-resulta-busca',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resulta-busca.html',
  styleUrl: './resulta-busca.css',
})
export class ResultaBusca implements OnInit {
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
    this.route.queryParams.subscribe(params => {
      let termo = params['busca'] || '';

      if (!termo && isPlatformBrowser(this.platformId)) {
        const json = localStorage.getItem('termoBusca');
        if (json != null) {
          termo = JSON.parse(json);
        }
      }

      if (!termo || !termo.trim()) {
        this.cdr.detectChanges();
      } else {
        this.mensagem = 'Busca com termo: ' + termo;
        this.service.fazerBusca(termo.trim()).subscribe({
          next: (dados) => {
            this.lista = dados;
            if (dados.length === 0) {
              this.mensagem = 'Nenhum produto encontrado para: ' + termo;
            }
            this.cdr.detectChanges();
          },
          error: () => {
            this.mensagem = 'Ocorreu um erro, tente mais tarde!';
            this.cdr.detectChanges();
          }
        });
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