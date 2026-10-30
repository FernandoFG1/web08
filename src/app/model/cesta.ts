import { ItemCesta } from './item-cesta';
import { Produto } from './produto';

export class Cesta {
  id?: number;
  itens: any[] = [];
  valorTotal: number = 0;

  removerItem(index: number): void {
    if (index >= 0 && index < this.itens.length) {
      this.itens.splice(index, 1);
    }
  }
}