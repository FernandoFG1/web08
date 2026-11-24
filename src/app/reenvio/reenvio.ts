import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-reenvio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reenvio.html',
  styleUrl: './reenvio.css'
})
export class ReenvioComponent {
  private cdr = inject(ChangeDetectorRef);

  obj: Cliente = new Cliente();
  email: string = '';
  mensagem: string = '';
  mensagemEnviada: boolean = false;

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  enviarEmail(): void {
    if (this.email.trim()) {
      this.obj.email = this.email.trim();
      this.service.resetarSenha(this.obj).subscribe({
        next: (dados) => {
          this.mensagem = dados;
          this.mensagemEnviada = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagem = 'Ocorreu um erro, tente mais tarde!';
          this.cdr.detectChanges();
        }
      });
    }
  }

  fecharEIrParaLogin(): void {
    this.mensagemEnviada = false;
    this.router.navigate(['/login']);
  }
}