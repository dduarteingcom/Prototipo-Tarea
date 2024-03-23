import { Injectable } from '@angular/core';
import { IDish } from '../pages/interfaces/plato.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  pedidos: IDish[] =[];
  constructor() { }
  /**
   * Modifica los platos que posee el carrito de compras
   * @param data Nuevo array de platos
   */
  setPedidos(data: IDish[]){
    this.pedidos = data;
  }
  /**
   *
   * @returns El arreglo de los platos del pedido
   */
  getPedidos(): IDish[]{
    return this.pedidos;
  }

}
