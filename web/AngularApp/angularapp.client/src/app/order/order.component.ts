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

  orders = [
    {
      "Id": 2,
      "cliente": "108660494",
      "chef": "mauro@gmail.com",
      "platos": [
        3
      ],
      "tiempoPreparacion": 25,
      "estado": true
    },
    {
      "Id": 3,
      "cliente": "118620970",
      "chef": "mauro@gmail.com",
      "platos": [
        2,
        3
      ],
      "tiempoPreparacion": 45,
      "estado": true
    }];

  @ViewChildren(TimerComponent)
  timers!: QueryList<TimerComponent>
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usermail = this.userService.getUserId();
    this.getActiveOrders();
    this.timers.forEach(timer => {
      // Access and initialize data for each TimerComponent
      // For example:
      console.log('HELLO 300');
      timer.minutes = 9;
      console.log(timer.seconds)
    });
  }

  //ngDoCheck(): void {
  //  this.accessTimers();
  //}

  //ngOnChanges(): void {
  //console.log('HELLO 1')
    
  //  this.accessTimers();
  //}

  ngAfterViewInit() {
    console.log('HELLO 2: ' + this.timers.length);
    // Access and use timers property here
    this.timers.forEach(timer => {
      // Access and initialize data for each TimerComponent
      // For example:
      console.log('HELLO 2');
      timer.minutes = 9;
      console.log(timer.seconds)

    });
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
    console.log('CERRANDOOOO')
    this.http.put(this.APIUrl + 'terminarPedido?id=' + orderId, this.usermail).subscribe();
    this.activeOrders = this.activeOrders.filter((order: { Id: number; }) => order.Id !== orderId);
  }

  //calls queue Angular View
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
