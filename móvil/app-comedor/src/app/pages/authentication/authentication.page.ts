import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuthenticationPage implements OnInit {

  constructor(
    private _router : Router
  ){}

  ngOnInit() {
  }
  moveToLogIn(){
    this._router.navigate(['log-in'])
  }
  moveToSignUp(){
    this._router.navigate(['sign-up'])
  }

}
