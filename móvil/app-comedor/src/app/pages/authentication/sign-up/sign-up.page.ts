import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up.service';
import { IClient } from '../../interfaces/cliente.model';
import { CONFIG } from '../../../../config/config';

@Component({

  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {
  readonly APIUrl = CONFIG.apiUrl + "cliente/"
  cedula: number | undefined;
  nombre: string = "";
  apellido1: string = "";
  apellido2: string = "";
  dia: string = "";
  mes: string = "";
  ano: string = "";
  provincia: string = "";
  canton: string = "";
  distrito: string = "";
  telefono1: string = ""
  telefono2: string = "";

  constructor(
    private _router: Router,
    private _signService: SignUpService,

  ) {

   }

  ngOnInit() {
  }
  goBack(){
    this._router.navigate(['/authentication'])
  }
  moveToMore(){
    if(this.nombre !== "" && this.apellido1 !=="" && this.apellido2 !=="" && this.dia !== ""
    && this.mes !== "" && this.ano !== "" && this.provincia!=="" && this.canton !=="" && this.distrito!== ""){
      const client : IClient = {
        cedula : this.cedula!,
        nombre : this.nombre,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
        fechaNacimiento: this.dia + '-' + this.mes + '-' + this.ano,
        provincia: this.provincia,
        canton: this.canton,
        distrito: this.distrito,
        telefonos: [this.telefono1, this.telefono2]
      }
      this._signService.setClient(client);
      this._router.navigate(['/sign-up-more'])

    }


  }

}
