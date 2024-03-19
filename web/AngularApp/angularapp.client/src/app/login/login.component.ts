/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  readonly APIUrl = "https://localhost:7258/usuario/";
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router) { }

  notes: any;
  response: any;


  prueba() {
    this.http.get(this.APIUrl + 'mostrarClientes').subscribe(data => {
      this.notes = data;
    });
  }
  login() {
    this.errorMessage = '';
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    this.checklogin();
  }
  checklogin() {
    this.http.get(this.APIUrl + 'encontrarCorreoPasswd?correo=' + this.email + '&password=' + this.password).subscribe({
      next: response => {
        if (response == 1) {
          // Navigate to the dashboard upon successful login
          this.errorMessage = 'Login exitoso admin'
          this.router.navigate(['/menu']);
        }
        else if (response == 2) {
          this.errorMessage = 'Login exitoso chef'
          this.router.navigate(['/admin-platos']);
        }
        else {
          // Show error message if the response is null
          this.errorMessage = 'Credenciales invalidas';
        }
      },
      error: error => {
        console.error('Login error:', error);
        // Handle login error
        this.errorMessage = 'Error occurred during login';
      }
    });
  }
}
