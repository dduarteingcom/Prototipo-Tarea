import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  /* eslint-disable @typescript-eslint/no-explicit-any */
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent {
  //API variables
  readonly APIUrl = "https://localhost:7258/chef/"
  response: any;
  orders: any = [];

  //Other vars
  usermail!: string;

  //orders = [
  //  {
  //    "Id": 2,
  //    "cliente": 108660494,
  //    "chef": "mauro@gmail.com",
  //    "platos": [
  //      3
  //    ],
  //    "horaDePedido": 21,
  //    "tiempoPreparacion": 25,
  //    "estado": false,
  //    "monto": 1500
  //  },
  //  {
  //    "Id": 3,
  //    "cliente": 118620970,
  //    "chef": "mauro@gmail.com",
  //    "platos": [
  //      2,
  //      3
  //    ], 
  //    "horaDePedido": 19,
  //    "tiempoPreparacion": 45,
  //    "estado": true,
  //    "monto": 6000
  //  },
  //  {
  //    "Id": 5,
  //    "cliente": 18620970,
  //    "chef": null,
  //    "platos": [
  //      1,
  //      2
  //    ],
  //    "horaDePedido": "15:04:55",
  //    "tiempoPreparacion": 16,
  //    "estado": true,
  //    "monto": 9500
  //  }];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usermail = this.userService.getUserId();
    this.getActiveOrders();
  }

  goToOrders() {
    this.router.navigate(['/chef']);
  }

  getActiveOrders() {
    this.http.get(this.APIUrl + 'obtenerPedidosDesasignados').subscribe({
      next: response => {
        console.log(response);
        this.orders = response;
        console.log(this.orders[0]);
      }
    });
  }

  selectOrder(orderId: number) {
    this.http.put(this.APIUrl + 'agarrarPedido?id=' + orderId + '&correo=' + this.usermail, this.usermail ).subscribe({
    });

    this.getActiveOrders();
    //this.orders = this.orders.filter(order => order.Id !== orderId);
  }
}
