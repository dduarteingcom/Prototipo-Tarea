import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {
  constructor(
    private _router : Router
  ){}
  moveToLogIn(){
    this._router.navigate(['/authentication/log-in'])
  }
  moveToSignUp(){
    this._router.navigate(['/authentication/sign-up'])
  }
}
