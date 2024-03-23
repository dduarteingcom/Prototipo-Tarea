import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { OrderComponent } from '../order/order.component'
import { OrderInt } from '../order.interface'


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit{

  @Input() parent!: OrderComponent;
  @Input() order!: OrderInt;
  @Input() minutes: number = 0;
  seconds: number = 10;
  timerSubscription: Subscription = new Subscription;
  usermail: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          console.log('order: ' + this.order);
          console.log('order id: ' + this.order.Id);
          this.timerSubscription.unsubscribe();
          this.parent.closeOrder(this.order.Id);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Unsubscribe from timer observable to prevent memory leaks
    }
  }
}
