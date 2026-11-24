import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  carregarVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produto/vitrine`);
  }

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produtos`);
  }

  buscarPorCodigo(codigo: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/produto/${codigo}`);
  }

  fazerBusca(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/produto/busca/${termo}`);
  }

  gravar(obj: Produto): Observable<any> {
    return this.http.post(`${this.url}/produto`, obj, { responseType: 'text' });
  }

  alterar(obj: Produto): Observable<any> {
    return this.http.put(`${this.url}/produto`, obj, { responseType: 'text' });
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.url}/produto/${codigo}`, { responseType: 'text' });
  }
}