import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  private termoSubject = new BehaviorSubject<string>('');
  termo$ = this.termoSubject.asObservable();

  atualizarTermo(termo: string): void {
    this.termoSubject.next(termo);
  }
}