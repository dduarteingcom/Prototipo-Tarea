import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  /* eslint-disable @typescript-eslint/no-explicit-any */
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent {
  //API variables
  readonly APIUrl = "http://localhost:5000/chef/"
  orders: any;

  //Other vars
  usermail: string = '';

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
    console.log(this.usermail)
    this.router.navigate(['/chef']);
    console.log(this.usermail)
  }

  getActiveOrders() {
    this.http.get(this.APIUrl + 'obtenerPedidosDesasignados').subscribe({
      next: response => {
        console.log('API Resposnse: ' + response);
        this.orders = response;
      }
    });
  }

  reloadPage() {
    // You can reload the page or re-render the component here
    // For example, you can use location.reload() to reload the entire page
    location.reload();
    this.ngOnInit();
  }

  selectOrder(orderId: number) {
    this.http.put(this.APIUrl + 'agarrarPedido?id=' + orderId + '&correo=' + this.usermail, this.usermail).subscribe();
    this.orders = this.orders.filter((order: { Id: number; }) => order.Id !== orderId);
  }

}

  //selectOrderisms(orderId: number) {
  //  this.http.put(this.APIUrl + 'agarrarPedido?id=' + orderId + '&correo=' + this.usermail, this.usermail).pipe(
  //    tap(() => this.reloadPage())
  //  ).subscribe(
  //    () => {
  //      console.log('PUT request completed');
  //    },
  //    (error) => {
  //      console.error('Error occurred during PUT request:', error);
  //    }
  //  );
  //}
  //  //this.orders = this.orders.filter(order => order.Id !== orderId);
  //}
