/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  readonly APIUrl = "https://localhost:7258/cliente/";
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient) { }

  notes:any;


  prueba() {
    this.http.get(this.APIUrl + 'mostrarClientes').subscribe(data => {
      this.notes = data;
    });
  }
  login() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

  }
}
