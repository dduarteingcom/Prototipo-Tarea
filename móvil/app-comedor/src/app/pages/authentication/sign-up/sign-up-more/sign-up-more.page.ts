import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SignUpService } from 'src/app/services/sign-up.service';
import { IClient } from 'src/app/pages/interfaces/cliente.model';
import { CheckUserService } from 'src/app/services/check-user.service';
import {CONFIG} from '../../../../../config/config'

@Component({
  selector: 'app-sign-up-more',
  templateUrl: './sign-up-more.page.html',
  styleUrls: ['./sign-up-more.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class SignUpMorePage implements OnInit {
  readonly APIUrl = CONFIG.apiUrl + "cliente/"
  correo: string = "";
  contrasena: string = "";
  ccontrasena: string = "";
  clientInfo: IClient;
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _signService: SignUpService,
    private _checkUser: CheckUserService,

  ) {
    this.clientInfo = {} as IClient;
   }

  ngOnInit() {

  }

  goBack(){
    this._router.navigate(['sign-up']);
  }
  goHome(){
    this.clientInfo = this._signService.getClient();
    console.log(this.clientInfo.apellido1);
    console.log(this.clientInfo.apellido2);
    if(this.contrasena === this.ccontrasena && this.contrasena!=="" && this.correo!==""){
      this._http.post(this.APIUrl + 'agregarCliente?cedula=' + this.clientInfo.cedula + '&primerNombre=' + this.clientInfo.nombre +
      '&apellido1=' + this.clientInfo.apellido1 + '&apellido2=' + this.clientInfo.apellido2 + '&correo=' + this.correo
      + '&contraseña=' + this.contrasena + '&distrito=' + this.clientInfo.distrito + '&canton=' + this.clientInfo.canton +
      '&provincia=' + this.clientInfo.provincia + '&fechaNacimiento=' + this.clientInfo.fechaNacimiento + this.clientInfo.telefonos
       , 'agregarCliente').subscribe()
     this._router.navigate(['/home']);
     this._checkUser.setNombre(this.clientInfo.nombre);
     this._checkUser.setCedula(this.clientInfo.cedula);

    }

  }
}
