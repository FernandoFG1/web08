import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private cdr = inject(ChangeDetectorRef);
  emailLogin: string = '';
  senhaLogin: string = '';
  loginSucesso: boolean = false;
  constructor(private router: Router) {}
  fazerLogin(): void {
    this.loginSucesso = true;
    this.cdr.detectChanges(); 
  }
  fecharEIrParaVitrine(): void {
    this.loginSucesso = false;
    this.router.navigate(['/vitrine']);
  }
}