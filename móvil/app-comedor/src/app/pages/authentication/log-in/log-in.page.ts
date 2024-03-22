import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckUserService } from 'src/app/services/check-user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LogInPage implements OnInit {

  readonly APIUrl = "https://192.168.18.134/cliente/"
  correo: string = "";
  contrasena: string = "";
  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _checkUser: CheckUserService
  ) { }

  ngOnInit() {
    this.pruebita()
  }
  goBack(){
    this._router.navigate(['/authentication']);
  }
  goHome(){
    this._router.navigate(['/home']);
  }
  pruebita(){
    this._httpClient.get(this.APIUrl + 'encontrarCorreoPasswd?correo=' + this.correo + '&password' + this.contrasena).subscribe((data:any)=>
    {
      if(1){
        this._router.navigate(['/home']);
      }
    })
  }

}
