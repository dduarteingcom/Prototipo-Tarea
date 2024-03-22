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

  getClient(): IClient{
    return this.client;
  }
  setClient(nClient: IClient){
    this.client = nClient;
    console.log(this.client);
  }
}
