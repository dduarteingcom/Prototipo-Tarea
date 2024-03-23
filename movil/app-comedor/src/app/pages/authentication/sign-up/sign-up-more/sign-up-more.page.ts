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
  /**
   * Función que devuelve a la página de sign-up
   */
  goBack(){
    this._router.navigate(['sign-up']);
  }
  /**
   * Función que dirige a la página de home
   */
  goHome(){
    this._router.navigate(['/home']);
  }
  /**
   * Función que envía la información a la API para registrar al usuario.
   */
  register(){
    this.clientInfo = this._signService.getClient();
    if(this.contrasena === this.ccontrasena && this.contrasena!=="" && this.correo!==""){
      let cliente = {
        cedula: this.clientInfo.cedula,
        primerNombre: this.clientInfo.nombre,
        apellido1: this.clientInfo.apellido1,
        apellido2: this.clientInfo.apellido2,
        correo: this.correo,
        contraseña: this.contrasena,
        distrito: this.clientInfo.distrito,
        canton: this.clientInfo.canton,
        provincia: this.clientInfo.provincia,
        fechaNacimiento: this.clientInfo.fechaNacimiento,
        telefonos: this.clientInfo.telefonos
      };
      this._http.post(this.APIUrl + 'agregarCliente', cliente).subscribe();
     this._checkUser.setNombre(this.clientInfo.nombre);
     this._checkUser.setCedula(this.clientInfo.cedula);
     this.goHome();
    }

  }
}
