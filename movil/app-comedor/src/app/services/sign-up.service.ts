import { Injectable } from '@angular/core';
import { IClient } from '../pages/interfaces/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  client: IClient;

  constructor( ) {
    this.client = {} as IClient;
  }
  /**
   * Retorna la interfaz de los datos temporales del cliente a registrar.
   * @returns Interfaz con datos personales
   */
  getClient(): IClient{
    return this.client;
  }
  /**
   * Modifica la interfaz del cliente a realizar
   * @param nClient nueva interfaz
   */
  setClient(nClient: IClient){
    this.client = nClient;
    console.log(this.client);
  }
}
