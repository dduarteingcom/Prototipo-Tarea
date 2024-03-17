import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._router.navigate(['/authentication'])
  }
  moveToMore(){
    this._router.navigate(['/sign-up-more'])
  }

}
