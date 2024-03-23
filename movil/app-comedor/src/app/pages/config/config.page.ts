import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckUserService } from 'src/app/services/check-user.service';
import{CONFIG} from '../../../config/config'
import { HttpClient,HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ConfigPage implements OnInit {
  readonly APIUrl = CONFIG.apiUrl + "cliente/"
  nPassword: string = "";
  constructor( private _router : Router,
               private _checkUserService: CheckUserService,
               private _http: HttpClient,
    ) { }

  ngOnInit() {
  }
  /**
   * Funicón que devuelve a la página home
   */
  goBack(){
    this._router.navigate(['/home']);
  }
  /**
   * Función que dirige a la página de autorización
   */
  movetoAuth(){
    this._router.navigate(['/authentication'])
  }
  /**
   * Función que realiza la petición para eliminar una cuenta de cliente
   */
  deleteAccount(){
    this._http.delete(this.APIUrl + 'eliminarCliente?cedula=' + this._checkUserService.getCedula()).subscribe();
    this.movetoAuth();
  }
  changePassword(){
    console.log('Here')
    if(this.nPassword!==""){
      this._http.put(this.APIUrl + 'modificarContraseña?cedula=' + this._checkUserService.getCedula() + '&nuevaContraseña=' + this.nPassword, 'modificarContraseña').subscribe()
    }
  }
}
