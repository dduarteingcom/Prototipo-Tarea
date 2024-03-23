import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ViewChildren, QueryList } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';


@Component({
  /* eslint-disable @typescript-eslint/no-explicit-any */
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {
  //API variables
  readonly APIUrl = "http://localhost:5000/chef/";
  response: any;

  //Binding variables
  inputBoxValue = '';
  clicked = false;
  activeOrders: any;
  dishIdCounter: number = 0;
  usermail!: string;
  isActive: boolean = false;

  @ViewChildren(TimerComponent)
  timers!: QueryList<TimerComponent>
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usermail = this.userService.getUserId();
    this.getActiveOrders();
  }

  accessTimers() {
    // Accessing all app-timer instances
    this.timers.forEach(timer => {
      // Perform actions on each app-timer instance
      console.log(timer); // Example: Logging each timer instance
    });
  }

  faqInteract() {
    this.isActive = !this.isActive;
  }

  closeOrder(orderId: number) {
    console.log('closing...')
    this.http.put(this.APIUrl + 'terminarPedido?id=' + orderId, this.usermail).subscribe();
    this.activeOrders = this.activeOrders.filter((order: { Id: number; }) => order.Id !== orderId);
  }

  goToQueue() {
    this.router.navigate(['/queue']);
    this.usermail = this.userService.getUserId();
  }

  getActiveOrders() {
    this.http.get(this.APIUrl + 'obtenerPedidosActivosChef?correo=' + this.usermail ).subscribe({
      next: response => {
        console.log(response);
        this.activeOrders = response;
        console.log(this.activeOrders[0]);
      }
    });
  }
}
