import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-more',
  templateUrl: './sign-up-more.page.html',
  styleUrls: ['./sign-up-more.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignUpMorePage implements OnInit {
  correo: string = "";
  contraseña: string = "";

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  goBack(){
    this._router.navigate(['sign-up']);
  }
  goHome(){
    this._router.navigate(['/home']);
  }
}
