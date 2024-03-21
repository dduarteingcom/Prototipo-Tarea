import { EventEmitter, Injectable } from '@angular/core';
import { IDish } from '../pages/interfaces/plato.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  pedidos: IDish[] =[];
  constructor() { }
  setPedidos(data: IDish[]){
    this.pedidos = data;
  }
  getPedidos(): IDish[]{
    return this.pedidos;
  }

}
