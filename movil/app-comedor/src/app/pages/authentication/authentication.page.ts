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
  /**
   * Función que dirige a la página de Log In
   */
  moveToLogIn(){
    this._router.navigate(['log-in'])
  }
  /**
   * Función que dirige a la página de Sign Up
   */
  moveToSignUp(){
    this._router.navigate(['sign-up'])
  }

}
