import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { IDish } from '../interfaces/plato.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CarritoPage implements OnInit {
  pedidos: IDish[] =[];
  constructor(
    private _router : Router,
    private _carritoService: CarritoService,
  ){

  }

  ngOnInit() {

    this.pedidos=this._carritoService.getPedidos();
  }
  /**
   * Función que devuelve a la página de home
   */
  goBack(){
    this._router.navigate(['/home'])
  }
  /**
   * Función que redirige a la página de pedido
   */
  goPedido(){
    if(this.pedidos.length>0){
      this._router.navigate(['/pedido'])
    }

  }
  /**
   * Función que elimina un plato del carrito de compras
   * @param pedido Nombre del plato que se va a eliminar
   */
  removeItem(pedido:string){
    this.pedidos = this.pedidos.filter((pedidos)=> pedidos.nombre !== pedido);
    this._carritoService.setPedidos(this.pedidos);
  }

}


