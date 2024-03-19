import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in.page',
  standalone: true,
  imports: [],
  templateUrl: './log-in.page.component.html',
  styleUrl: './log-in.page.component.scss'
})
export class LogInPageComponent {
  constructor(
    private _router: Router
    ){}
  goBack(){
    this._router.navigate(['/home-app'])
  }
}
