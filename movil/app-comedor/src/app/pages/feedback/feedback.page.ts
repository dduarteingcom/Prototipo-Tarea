import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CONFIG } from 'src/config/config';
import { CheckUserService } from 'src/app/services/check-user.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { IDish } from '../interfaces/plato.model';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class FeedbackPage implements OnInit {

  readonly APIUrl = CONFIG.apiUrl + "plato/"
  idplatos: number[] = [];
  pedidos: IDish[] =[];

  constructor(
    private _router: Router,
    private _facturaService : FacturaService,
    private _httpClient: HttpClient,
    private _carritoService: CarritoService,

    ) { }

  ngOnInit() {
    this.pedidos=this._carritoService.getPedidos();
  }

  goHome(){
    this._router.navigate(['/home']);
  }
  selectedRating: number = 0;

  onRatingChange(event: any) {
    this.selectedRating = event.target.value;

  }

  calificar(){
    const temporal = this._carritoService.getPedidos();

    for(let idplato of temporal){
      console.log(temporal);
      console.log(idplato.Id)
      this.idplatos.push(idplato.Id);
    }
    let seleccion = {
      ids: this.idplatos,
      estrellas: this.selectedRating
    }
    this._httpClient.put(this.APIUrl + 'agregarCalificacion', seleccion).subscribe();
  }



}
