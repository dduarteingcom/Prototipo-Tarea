import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { IDish } from '../interfaces/plato.model';
import { FacturaService } from 'src/app/services/factura.service';
import { CheckUserService } from 'src/app/services/check-user.service';

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
  fecha: string = "";
  hora: string = "";
  id: number = 0;
  nombre: string = "";
  constructor(
    private _router: Router,
    private _carritoService: CarritoService,
    private _facturaService: FacturaService,
    private _checkUser : CheckUserService,
    ) { }

  ngOnInit() {
    this.pedidos=this._carritoService.getPedidos();
    this.getMontoTotal();
    this.fecha = this._facturaService.getFecha();
    this.hora = this._facturaService.getHora();
    this.id = Math.floor(Math.random() * (1000000 - 99999 + 1)) + 99999;
    this.nombre = this._checkUser.geNombre();
  }

  goBack(){
    this._router.navigate(['/carrito'])
  }
  getMontoTotal():void{
    this.pedidos.forEach(pedido=>{
      this.montoTotal += pedido.precio;
    })
  }

  goFeedback(){
    this._router.navigate(['/feedback'])
  }

}
