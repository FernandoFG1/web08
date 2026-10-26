import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent implements OnInit {
  cadastroSucesso: boolean = false;
  mensagem: string = "";
  obj: Record<string, any> = {};
  constructor(private router: Router) {}
  ngOnInit(): void {}
  carregar(): void {
    this.mensagem = "cadastro atualizado com sucesso!";
    let json = JSON.stringify(this.obj);
    localStorage.setItem("cadastro", json);
  }
  gravar(): void {}
  mudarsenha(): void {}
  finalizarCadastro(): void {
    this.cadastroSucesso = true;
  }

  fecharEIrParaLogin(): void {
    this.cadastroSucesso = false;
    this.router.navigate(['/login']);
  }
}