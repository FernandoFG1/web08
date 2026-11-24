import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = 'http://localhost:8081/api/cliente';

  constructor(private http: HttpClient) {}

  buscarPorCodigo(codigo: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${codigo}`);
  }

  gravar(obj: Cliente): Observable<any> {
    return this.http.post(this.url, obj, { responseType: 'text' });
  }

  alterar(obj: Cliente): Observable<any> {
    return this.http.put(this.url, obj, { responseType: 'text' });
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.url}/${codigo}`, { responseType: 'text' });
  }

  login(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/login`, obj);
  }

  resetarSenha(obj: Cliente): Observable<any> {
    return this.http.patch(`${this.url}/resetarSenha`, obj, { responseType: 'text' });
  }

  alterarSenha(obj: Cliente): Observable<any> {
    return this.http.patch(`${this.url}/alterarSenha`, obj, { responseType: 'text' });
  }
}