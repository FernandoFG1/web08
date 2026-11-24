import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barra-busca.html',
  styleUrl: './barra-busca.css'
})
export class BarraBusca implements OnInit {
  private platformId = inject(PLATFORM_ID);
  termoBusca: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem('termoBusca');
      if (json != null) {
        try {
          this.termoBusca = JSON.parse(json);
        } catch {
          this.termoBusca = json;
        }
      }
    }
  }

  salvarNoStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('termoBusca', JSON.stringify(this.termoBusca));
    }
  }

  buscar(): void {
    this.salvarNoStorage();
    this.router.navigate(['/busca'], { queryParams: { busca: this.termoBusca } });
  }
}