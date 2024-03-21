import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDish } from '../interfaces/plato.model';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckUserService } from 'src/app/services/check-user.service';
import {CONFIG} from '../../../config/config'

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
    userName: string = "";
  swiperModules = [IonicSlides];
  pedidos: IDish[] =[];
  platos: any;
  readonly APIUrl = CONFIG.apiUrl + "plato/"
  constructor(
    private _router : Router,
    private _carritoService: CarritoService,
    private _checkUser : CheckUserService,
    private _http: HttpClient
  ){
  }
  ngOnInit() {
    this.userName = this._checkUser.geNombre();
    this._http.get(this.APIUrl +'mostrarPlatos').subscribe((data: any )=>{
        this.platos = data;
    }
    )
  }
  moveToCarrito(){
    this._router.navigate(['/carrito']);
  }
  addToCarrito(plato: string){
    this.pedidos=this._carritoService.getPedidos();
    const newOrder = this.platos.filter((platos: { nombre: string; })=>
    platos.nombre.toLocaleLowerCase().includes(plato.toLowerCase())
    );
    this.pedidos.push(newOrder[0]);
    console.log(this.pedidos)
    this._carritoService.setPedidos(this.pedidos);
  }
  moveToConfig(){
    this._router.navigate(['/config'])
  }
}
