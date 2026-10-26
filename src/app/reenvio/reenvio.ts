import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-reenvio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reenvio.html',
  styleUrl: './reenvio.css'
})
export class ReenvioComponent {
  private cdr = inject(ChangeDetectorRef);
  email: string = '';
  mensagemEnviada: boolean = false;
  constructor(private router: Router) {}
  enviarEmail(): void {
    if (this.email.trim()) {
      this.mensagemEnviada = true;
      this.cdr.detectChanges(); 
    }
  }
  fecharEIrParaLogin(): void {
    this.mensagemEnviada = false;
    this.router.navigate(['/login']);
  }
}