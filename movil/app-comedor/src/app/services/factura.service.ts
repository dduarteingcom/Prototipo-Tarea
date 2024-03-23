import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  fecha: string = "";
  hora: string = "";
  hour: string = "";
  minute: string = "";
  second: string = "";
  date: Date = new Date();
  constructor(

  ) {

  }
  setFecha(){
    this.fecha = this.date.getDate() + "/" + Number(this.date.getMonth() + 1) + "/" + this.date.getFullYear();
  }

  getFecha(){
    return this.fecha;
  }

  setHora(){
    this.hour = this.date.getHours() + "";
    this.minute = this.date.getMinutes() + "";
    this.second = this.date.getSeconds() + "";

    if(this.date.getHours() < 10){
      this.hour = "0" + this.date.getHours();
    }
    if(this.date.getMinutes() < 10){
      this.minute = "0" + this.date.getMinutes();
    }
    if(this.date.getSeconds() < 10){
      this.second = "0" + this.date.getSeconds();
    }

    this.hora = this.hour + ":" + this.minute + ":" + this.second;
  }

  getHora(){
    return this.hora;
  }


}

