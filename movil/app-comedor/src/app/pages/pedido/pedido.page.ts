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
  intervalId: any;
  pedidos: IDish[] =[];
  montoTotal: number = 0;
  fecha: string = "";
  hora: string = "";
  id: number = 0;
  nombre: string = "";
  tiempoRestante: number = 0;
  mostrarDiv: boolean = false;
  textoRestante: string = "Faltan " + this.tiempoRestante + " minutos para que se complete tu pedido.";
  constructor(
    private _router: Router,
    private _carritoService: CarritoService,
    private _facturaService: FacturaService,
    private _checkUser : CheckUserService,
    ) { }

  ngOnInit() {
    this.pedidos=this._carritoService.getPedidos();
    this.getMontoTotal();
    this.setDuracion();
    this.fecha = this._facturaService.getFecha();
    this.hora = this._facturaService.getHora();
    this.id = Math.floor(Math.random() * (1000000 - 99999 + 1)) + 99999;
    this.nombre = this._checkUser.geNombre();
    this.intervalId = setInterval(() => {
      console.log(this.tiempoRestante);
      this.tiempoRestante--;
      if(this.tiempoRestante > 1){
        this.textoRestante = "Faltan " + this.tiempoRestante + " minutos para que se complete tu pedido."
      }
      if(this.tiempoRestante == 1){
        this.textoRestante = "Falta " + this.tiempoRestante + " minuto para que se complete tu pedido."
      }
      if(this.tiempoRestante < 1){
        this.textoRestante = "Tu pedido se ha completado."
        this.mostrarDiv = true;
        clearInterval(this.intervalId);
      }
    }, 6000);
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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


  setDuracion():void{
    this.pedidos.forEach(pedido=>{
      this.tiempoRestante += pedido.duracion;
    })
  }
  }



