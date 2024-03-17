import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LogInPage implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._router.navigate(['/authentication']);
  }
  goHome(){
    this._router.navigate(['/home']);
  }

}
