/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  readonly APIUrl = "http://localhost:5000/usuario/";
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

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
          this.userService.setUserId(this.email);
        }
        else if (response == 2) {
          this.errorMessage = 'Login exitoso chef'
          this.router.navigate(['/chef']);
          this.userService.setUserId(this.email);
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
