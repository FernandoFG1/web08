import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  cadastroSucesso: boolean = false;
  mensagem: string = '';
  obj: Cliente = new Cliente();

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.mensagem = '';
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem('cadastro');
      if (json != null) {
        const salvo: Cliente = JSON.parse(json);
        if (salvo && salvo.codigo > 0) {
          this.obj = salvo;
        }
      }
    }
  }

  gravar(): void {
    this.mensagem = '';
    if (!this.obj.codigo || this.obj.codigo == 0) {
      this.obj.ativo = 1;
      this.service.gravar(this.obj).subscribe({
        next: (dados: string) => {
          this.mensagem = dados.replace(/\s*\d+$/, '');
          this.cadastroSucesso = true;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.mensagem = 'Erro ao gravar cliente no servidor (Status: ' + (err.status || 'sem conexão') + ').';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.service.alterar(this.obj).subscribe({
        next: (dados: string) => {
          this.mensagem = dados.replace(/\s*\d+$/, '');
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cadastro', JSON.stringify(this.obj));
          }
          this.cadastroSucesso = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagem = 'Erro ao alterar cliente no servidor.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  finalizarCadastro(): void {
    this.gravar();
  }

  fecharEIrParaLogin(): void {
    this.cadastroSucesso = false;
    this.router.navigate(['/login']);
  }
}