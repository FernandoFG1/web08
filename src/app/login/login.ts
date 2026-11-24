import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  obj: Cliente = new Cliente();
  mensagem: string = '';
  loginSucesso: boolean = false;

  constructor(private service: ClienteService, private router: Router) {}

  fazerLogin(): void {
    this.mensagem = '';
    this.service.login(this.obj).subscribe({
      next: (dados) => {
        if (dados && dados.codigo > 0) {
          this.obj = dados;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cadastro', JSON.stringify(this.obj));
          }
          this.loginSucesso = true;
        } else {
          this.mensagem = 'Email ou senha incorretos! Verifique.';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Ocorreu um erro, tente mais tarde.';
        this.cdr.detectChanges();
      }
    });
  }

  fecharEIrParaVitrine(): void {
    this.loginSucesso = false;
    this.router.navigate(['/vitrine']);
  }
}