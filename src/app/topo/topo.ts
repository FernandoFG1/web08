import { Component, OnInit, DoCheck, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraBusca } from '../barra-busca/barra-busca';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, BarraBusca],
  templateUrl: './topo.html',
  styleUrl: './topo.css'
})
export class Topo implements OnInit, DoCheck {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private ultimoJson: string | null = null;

  nomeUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarLogin();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.verificarLogin());
  }

  ngDoCheck(): void {
    if (isPlatformBrowser(this.platformId)) {
      const atual = localStorage.getItem('cadastro');
      if (atual !== this.ultimoJson) {
        this.verificarLogin();
      }
    }
  }

  verificarLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem('cadastro');
      this.ultimoJson = json;
      if (json != null) {
        try {
          const obj: Cliente = JSON.parse(json);
          if (obj && obj.nome) {
            this.nomeUsuario = obj.nome;
            this.cdr.detectChanges();
            return;
          }
        } catch {}
      }
      this.nomeUsuario = '';
      this.cdr.detectChanges();
    }
  }

  sair(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cadastro');
      this.ultimoJson = null;
    }
    this.nomeUsuario = '';
    this.router.navigate(['/login']);
  }
}