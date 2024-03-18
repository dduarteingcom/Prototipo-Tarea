/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  readonly APIUrl = "https://localhost:7258/cliente";
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient) { }

  notes:string | undefined;


  prueba() {
    this.http.get(this.APIUrl + '/encontrarCedula' + '?cedula=118620970').subscribe(data => { this.notes = data; })
    console.log("Hola");
    console.log(this.notes);

  }

  login() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post(this.APIUrl, formData).subscribe({
      next: response => {
        // Handle successful login
      },
      error: error => {
        // Handle login error
      }
    });
  }
}
