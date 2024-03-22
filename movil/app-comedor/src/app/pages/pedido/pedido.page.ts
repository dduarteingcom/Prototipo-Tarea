import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { IDish } from '../interfaces/plato.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PedidoPage implements OnInit {
  pedidos: IDish[] =[];
  montoTotal: number = 0;
  constructor(
    private _router: Router,
    private _carritoService: CarritoService,
    ) { }

  ngOnInit() {
    this.pedidos=this._carritoService.getPedidos();
    this.getMontoTotal();
  }

  goBack(){
    this._router.navigate(['/carrito'])
  }
  getMontoTotal():void{
    this.pedidos.forEach(pedido=>{
      this.montoTotal += pedido.precio;
    })
  }

}
