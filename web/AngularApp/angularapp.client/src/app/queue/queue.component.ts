import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent {
  constructor(private router:Router) { }
  goToOrders() {
    this.router.navigate(['/chef']);
  }
}
