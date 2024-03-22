import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

interface chefOrder {
  id: number;
  dishes: number[];
  timer: number;
  active: boolean;
}

@Component({
  /* eslint-disable @typescript-eslint/no-explicit-any */
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {
  //API variables
  readonly APIUrl = "https://localhost:7258/chef/";
  response: any;

  //Binding variables
  inputBoxValue = '';
  clicked = false;
  SavedOrders: any = [];
  chefOwnOrders: chefOrder[] = [];
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
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.usermail = this.userService.getUserId();
    this.getActiveOrders();

  }

  faqInteract() {
    this.isActive = !this.isActive;
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

  newOrder() {
    if (this.inputBoxValue.trim() !== '') {
      const newOrder: chefOrder = {
        id: this.dishIdCounter++,
        dishes: [1, 2],
        timer:  Number(this.inputBoxValue),
        active: false
      };
      this.chefOwnOrders.push(newOrder);
      this.inputBoxValue = ''; // Clear input box after adding task
    }
    else {
      alert("You must type something!")
    }
  }
}
