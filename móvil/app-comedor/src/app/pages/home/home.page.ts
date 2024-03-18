import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDish } from '../interfaces/plato.model';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { HttpClientModule } from '@angular/common/http';

register();

@Component({
  selector: 'app-home.page',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule,]
})
export class HomePage {

  swiperModules = [IonicSlides];
  pedidos: IDish[] =[];
  platos: IDish[] =[
    {
     nombre: 'hamburguesa',
     precio: 3000,
     descripcion: 'Rica hamburguesa',
    ingredientes: ['pan',' queso'],
    tipo:'delicioso',
    cantidadCalorias: 443,
    duracion: 20 },

    {
     nombre: 'pizza',
     precio: 3000,
     descripcion: 'Rica pizza',
    ingredientes: ['pan',' queso'],
    tipo:'sabroso',
    cantidadCalorias: 443,
    duracion: 30 },
    {
     nombre: 'sushi',
     precio: 5500,
     descripcion: 'Rica sushi',
    ingredientes: ['pescado',' alga'],
    tipo:'marisco',
    cantidadCalorias: 403,
    duracion: 18
    }
  ];
  constructor(
    private _router : Router,
    private _carritoService: CarritoService
  ){
  }
  ngOnInit() {
    
  }
  moveToCarrito(){
    this._router.navigate(['/carrito']);
  }
  addToCarrito(plato: string){
    this.pedidos=this._carritoService.getPedidos();
    const newOrder = this.platos.filter((platos)=>
    platos.nombre.toLocaleLowerCase().includes(plato.toLowerCase())
    );
    this.pedidos.push(newOrder[0]);
    console.log(this.pedidos)
    this._carritoService.setPedidos(this.pedidos);
  }
}
