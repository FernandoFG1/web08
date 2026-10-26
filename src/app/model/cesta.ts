import { ItemCesta } from './item-cesta';
export interface Cesta {
  id?: number;
  itens: ItemCesta[];
  valorTotal: number;
}