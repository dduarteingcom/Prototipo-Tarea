import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {

  constructor(private router:Router) { }

  goToQueue() {
    this.router.navigate(['/queue']);
  }

}
