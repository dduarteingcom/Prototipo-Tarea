import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  nombre: string = "";
  cedula: number = 0;

  constructor() { }

  geNombre(): string{
    return this.nombre;
  }
  setNombre(nNombre: string){
    this.nombre = nNombre;
  }
  getCedula(): number{
    return this.cedula;
  }
  setCedula(nCedula : number){
    this.cedula = nCedula;
  }

}
