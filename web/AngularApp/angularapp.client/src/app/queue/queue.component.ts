import { Component } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
=======
>>>>>>> FrontEndDev

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent {
<<<<<<< HEAD
  //API variables
  readonly APIUrl = "http://localhost:5000/chef/"
  orders: any;

  //Other vars
  usermail: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usermail = this.userService.getUserId();
    this.getPendingOrders();
  }

=======
  constructor(private router:Router) { }
>>>>>>> FrontEndDev
  goToOrders() {
    console.log(this.usermail)
    this.router.navigate(['/chef']);
    console.log(this.usermail)
  }
<<<<<<< HEAD

  getPendingOrders() {
    this.http.get(this.APIUrl + 'obtenerPedidosDesasignados').subscribe({
      next: response => {
        console.log('API Resposnse: ' + response);
        this.orders = response;
      }
    });
  }

  reloadPage() {
    location.reload();
    this.ngOnInit();
  }

  selectOrder(orderId: number) {
    this.http.put(this.APIUrl + 'agarrarPedido?id=' + orderId + '&correo=' + this.usermail, this.usermail).subscribe();
    this.orders = this.orders.filter((order: { Id: number; }) => order.Id !== orderId);
  }

=======
>>>>>>> FrontEndDev
}

