import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up.page',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.page.component.html',
  styleUrl: './sign-up.page.component.scss'
})
export class SignUpPageComponent {
  constructor(
    private _router: Router
    ){}
  goBack(){
    this._router.navigate(['/home-app'])
  }
  moveToMore(){
    this._router.navigate(['/authentication/more'])
  }
}
