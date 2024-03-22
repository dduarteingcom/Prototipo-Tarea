import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up.service';
import { IClient } from '../../interfaces/cliente.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {

  cedula: number = 0;
  nombre: string = "";
  apellidos: string = "";
  fechaNacimiento: string = "";
  provincia: string = "";
  canton: string = "";
  distrito: string = "";
  telefono1: number = 0;
  telefono2: number = 0;



  constructor(
    private _router: Router,
    private _signService: SignUpService
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._router.navigate(['/authentication'])
  }
  moveToMore(){
    if(this.nombre !== "" && this.apellidos !=="" && this.fechaNacimiento !== "" && this.provincia!=="" && this.canton !=="" && this.distrito!== ""){
      const client : IClient = {
        cedula : this.cedula,
        nombre : this.nombre,
        apellidos: this.apellidos,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        canton: this.canton,
        distrito: this.distrito,
        telefono1: this.telefono1,
        telefono2: this.telefono2
      }
      this._router.navigate(['/sign-up-more'])
      this._signService.setClient(client);
    }


  }

}
