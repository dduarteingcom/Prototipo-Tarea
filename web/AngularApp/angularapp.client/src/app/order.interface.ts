import { Time } from "@angular/common";

export interface OrderInt {
  Id: number;
  cliente: number;
  chef: string;
  platos: number[];
  horaDePedido: Time;
  tiempoPreparacion: number;
  estado: boolean;
  monto: number;
}
