import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckUserService } from 'src/app/services/check-user.service';
import {CONFIG} from '../../../../config/config'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LogInPage implements OnInit {

  readonly APIUrl = CONFIG.apiUrl + "cliente/"
  correo: string = "";
  contrasena: string = "";
  error: boolean = false;
  prueba: string ="";
  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _checkUser: CheckUserService,
  ) { }

  ngOnInit() {
  }
  /**
   * Función que se devuelve a autenticación.
   */
  goBack(){
    this._router.navigate(['/authentication']);
  }
  /**
   * Función que dirige a la página de home
   */
  moveToHome(){
    this._router.navigate(['/home']);
  }
  /**
   * Función que comprueba si el correo y contraseña son correctos.
   */
  checkInfo(){
    this.prueba="Mauro sobo"
    if(this.correo!==""&& this.contrasena!==""){
      this._httpClient.get(this.APIUrl + 'encontrarCorreoPasswd?correo=' + this.correo + '&password=' + this.contrasena ).subscribe((data:any)=>
    {
      if(data){
        this._checkUser.setNombre(data.nombre.primerNombre);
        this._checkUser.setCedula(data.cedula);
        this.moveToHome();
        this.error = false;
      }
      else{
        this.error = true;
      }
    })
    }

  }

}
