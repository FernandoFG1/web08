import { Routes } from '@angular/router';
import { VitrineComponent } from './vitrine/vitrine';
import { DetalheComponent } from './detalhe/detalhe';
import { CestaComponent } from './cesta/cesta';
import { CadastroComponent } from './cadastro/cadastro';
import { LoginComponent } from './login/login';
import { ReenvioComponent } from './reenvio/reenvio';
import { ResultaBusca } from './resulta-busca/resulta-busca';
import { Pedido } from './pedido/pedido';
import { ListaPedidos } from './lista-pedidos/lista-pedidos';

export const routes: Routes = [
  { path: '', redirectTo: 'vitrine', pathMatch: 'full' },
  { path: 'vitrine', component: VitrineComponent },
  { path: 'promo', component: VitrineComponent },
  { path: 'detalhe', component: DetalheComponent },
  { path: 'detalhe/:codigo', component: DetalheComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reenvio', component: ReenvioComponent },
  { path: 'busca', component: ResultaBusca },
  { path: 'resulta-busca', component: ResultaBusca },
  { path: 'pedido', component: Pedido },
  { path: 'lista-pedidos', component: ListaPedidos }
];