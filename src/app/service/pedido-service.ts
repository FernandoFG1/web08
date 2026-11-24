import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url = 'http://localhost:8081/api/pedido';

  constructor(private http: HttpClient) {}

  buscarPorCodigo(codigo: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.url}/${codigo}`);
  }

  gravar(obj: Pedido): Observable<any> {
    return this.http.post(this.url, obj, { responseType: 'text' });
  }

  alterar(obj: Pedido): Observable<any> {
    return this.http.put(this.url, obj, { responseType: 'text' });
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.url}/${codigo}`, { responseType: 'text' });
  }
}