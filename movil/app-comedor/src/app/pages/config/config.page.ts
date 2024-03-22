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

  constructor( private _router : Router,
               private _checkUserService: CheckUserService,
               private _http: HttpClient,
    ) { }

  ngOnInit() {
  }
  goBack(){
    this._router.navigate(['/home']);
  }
  movetoAuth(){
    this._router.navigate(['/authentication'])
  }
  deleteAccount(){
    this._http.delete(this.APIUrl + 'eliminarCliente?cedula=' + this._checkUserService.getCedula()).subscribe();
    this.movetoAuth();
  }
}
