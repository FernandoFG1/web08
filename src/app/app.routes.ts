import { Routes } from '@angular/router';
import { VitrineComponent } from './vitrine/vitrine';
import { CadastroComponent } from './cadastro/cadastro';
import { DetalheComponent } from './detalhe/detalhe';
import { LoginComponent } from './login/login';
import { CestaComponent } from './cesta/cesta';
import { Pedido } from './pedido/pedido';
import { ListaPedidos } from './lista-pedidos/lista-pedidos';
import { ReenvioComponent } from './reenvio/reenvio';
import { ResultaBusca } from './resulta-busca/resulta-busca';

export const routes: Routes = [
 { path: '', redirectTo: 'vitrine', pathMatch: 'full' },
  { path: 'vitrine', component: VitrineComponent },
  { path: "promo", component: VitrineComponent },
 { path: 'cadastro', component: CadastroComponent },
  { path: 'detalhe/:id', component: DetalheComponent },
  { path: "login", component: LoginComponent },
  { path: "cesta", component: CestaComponent },
  { path: "pedido", component: Pedido },
  { path: "pedidos", component: ListaPedidos },
  { path: 'reenvio', component: ReenvioComponent },
  { path: "busca", component: ResultaBusca }
];