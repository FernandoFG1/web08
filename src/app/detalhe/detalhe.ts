import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class DetalheComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  produto?: Produto;
  quantidadeDesejada: number = 1;

  lista: Produto[] = [
    {
      codigo: 1,
      nome: "Mangueira de Silicone 90° 3\" MetalHorse",
      descritivo: "Mangueira de silicone de alta performance com 4 tramas de poliéster reforçado para pressurização.",
      valor: 129.90,
      valorPromo: 99.90,
      quantidade: 15,
      destaque: 1,
      keywords: "silicone, mangueira, pressurizacao, turbo, intake"
    },
    {
      codigo: 2,
      nome: "Conexão AN8 Reta em Alumínio Anodizado",
      descritivo: "Conector Aeroquip AN8 para linhas de combustível, óleo e fluido com vedação de alta pressão.",
      valor: 65.00,
      valorPromo: 0,
      quantidade: 35,
      destaque: 0,
      keywords: "an8, conexao, aeroquip, oleo, combustivel"
    },
    {
      codigo: 3,
      nome: "Reservatório de Óleo Oil Catch Can 1L",
      descritivo: "Catch Can universal em alumínio maciço com filtro respirador e medidor de nível.",
      valor: 349.90,
      valorPromo: 299.90,
      quantidade: 8,
      destaque: 1,
      keywords: "catch can, reservatorio, oleo, motor, blowby"
    },
    {
      codigo: 4,
      nome: "Intercooler Frontal Bar & Plate 2.5\"",
      descritivo: "Intercooler em alumínio brasado para alta troca térmica em motores turbo adaptados.",
      valor: 890.00,
      valorPromo: 780.00,
      quantidade: 5,
      destaque: 1,
      keywords: "intercooler, turbo, resfriador, ar, performance"
    },
    {
      codigo: 5,
      nome: "Radiador de Óleo 13 Linhas Alumínio",
      descritivo: "Kit radiador de óleo de motor/câmbio para redução imediata da temperatura de trabalho.",
      valor: 480.00,
      valorPromo: 0,
      quantidade: 12,
      destaque: 0,
      keywords: "radiador, oleo, arrefecimento, motor, pista"
    },
    {
      codigo: 6,
      nome: "Manta Térmica para Caixa Quente Turbo T3",
      descritivo: "Manta de titânio para retenção de calor na carcaça quente, aumentando a velocidade do fluxo de exaustão.",
      valor: 220.00,
      valorPromo: 189.90,
      quantidade: 20,
      destaque: 1,
      keywords: "manta termica, turbo, t3, titanio, calor"
    },
    {
      codigo: 7,
      nome: "Turbina Master Power .50 / .63 Caixa Quente T3",
      descritivo: "Turbina para motores de 1.8L a 2.5L de alta performance com rotor billet em alumínio maciço.",
      valor: 2450.00,
      valorPromo: 2190.00,
      quantidade: 4,
      destaque: 1,
      keywords: "turbina, turbo, master power, t3, billet, motor"
    },
    {
      codigo: 8,
      nome: "Turbina Roleteada GT2871R Dual Ball Bearing",
      descritivo: "Turbocompressor roleteado para pegada rápida de spool (low lag), suportando até 450cv.",
      valor: 3890.00,
      valorPromo: 3490.00,
      quantidade: 2,
      destaque: 1,
      keywords: "turbina, roleteada, gt2871r, ball bearing, spool"
    },
    {
      codigo: 9,
      nome: "Kit Intercooler Plug and Play EA888 (Golf GTI / Jetta)",
      descritivo: "Intercooler de substituição direta de alta eficiência com colmeia Bar & Plate em alumínio.",
      valor: 2990.00,
      valorPromo: 0,
      quantidade: 6,
      destaque: 1,
      keywords: "intercooler, golf gti, jetta, ea888, plug and play"
    },
    {
      codigo: 10,
      nome: "Intercooler Frontal Universal 550x230x65mm Entrada 2.5\"",
      descritivo: "Colmeia dimensionada para resfriamento extremo do ar de pressurização em projetos customizados.",
      valor: 980.00,
      valorPromo: 850.00,
      quantidade: 10,
      destaque: 0,
      keywords: "intercooler, universal, resfriamento, turbo, pressurizacao"
    },
    {
      codigo: 11,
      nome: "Válvula de Alívio Blow Off Valve (BOV) MetalHorse",
      descritivo: "Válvula de espirro em alumínio usinado CNC com regulagem interna de carga de mola.",
      valor: 320.00,
      valorPromo: 279.90,
      quantidade: 18,
      destaque: 1,
      keywords: "bov, blow off, valvula, espirro, alivio"
    },
    {
      codigo: 12,
      nome: "Wastegate Externa V-Band 45mm Alta Vazão",
      descritivo: "Controle preciso da pressão de boost no coletor de escape com corpo de aço inox.",
      valor: 640.00,
      valorPromo: 0,
      quantidade: 9,
      destaque: 0,
      keywords: "wastegate, vband, controle, boost, pressao"
    },
    {
      codigo: 13,
      nome: "Kit Pressurização em Alumínio 2.5\" com Mangotes NBR",
      descritivo: "Tubulação de pressurização polida com conexões reforçadas de silicone e abraçadeiras t-bolt.",
      valor: 850.00,
      valorPromo: 760.00,
      quantidade: 7,
      destaque: 0,
      keywords: "pressurizacao, aluminio, mangotes, turbo, kit"
    },
    {
      codigo: 14,
      nome: "Manômetro de Pressão de Turbo 0 a 3 Bar Auto Gauge 52mm",
      descritivo: "Relógio indicador mecânico com iluminação LED configurável e mostrador fundo preto.",
      valor: 210.00,
      valorPromo: 189.00,
      quantidade: 15,
      destaque: 0,
      keywords: "manometro, turbo, bar, instrumento, painel"
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id') || this.route.snapshot.paramMap.get('codigo');
    const id = Number(param);
    this.produto = this.lista.find(p => p.codigo === id);
  }

  aumentarQtd(): void {
    this.quantidadeDesejada++;
  }

  diminuirQtd(): void {
    if (this.quantidadeDesejada > 1) {
      this.quantidadeDesejada--;
    }
  }

  comprar(): void {
    if (!this.produto) return;

    if (isPlatformBrowser(this.platformId)) {
      const cestaSalva = localStorage.getItem('cesta_metalhorse');
      let cesta: Produto[] = cestaSalva ? JSON.parse(cestaSalva) : [];

      const itemExistente = cesta.find(p => p.codigo === this.produto!.codigo);
      if (itemExistente) {
        itemExistente.quantidade += this.quantidadeDesejada;
      } else {
        cesta.push({
          ...this.produto,
          quantidade: this.quantidadeDesejada
        });
      }

      localStorage.setItem('cesta_metalhorse', JSON.stringify(cesta));
    }

    this.router.navigate(['/cesta']);
  }
}