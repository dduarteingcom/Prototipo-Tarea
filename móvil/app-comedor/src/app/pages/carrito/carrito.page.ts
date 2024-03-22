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
  goBack(){
    this._router.navigate(['/home'])
  }
  goPedido(){
    if(this.pedidos.length>0){
      this._router.navigate(['/pedido'])
    }

  }
  removeItem(pedido:string){
    this.pedidos = this.pedidos.filter((pedidos)=> pedidos.nombre !== pedido);
    console.log(this.pedidos);
    this._carritoService.setPedidos(this.pedidos);
  }

}


