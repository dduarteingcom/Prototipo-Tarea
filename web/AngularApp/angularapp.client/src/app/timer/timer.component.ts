import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit{

  @Input() minutes: number = 0;
  seconds: number = 10;
  timerSubscription: Subscription = new Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          console.log('FINISH');
          this.timerSubscription.unsubscribe(); // Stop the timer
      //    this.sendPutRequest(); // Trigger PUT request
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    });
  }

  sendPutRequest() {
    const url = 'your_api_endpoint';
    const newData = { /* Updated data object */ };

    this.http.put(url, newData).subscribe(
      () => {
        console.log('PUT request completed');
      },
      (error) => {
        console.error('Error occurred during PUT request:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Unsubscribe from timer observable to prevent memory leaks
    }
  }
}
