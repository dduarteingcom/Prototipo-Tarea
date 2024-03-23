/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usermail!: string;
  readonly APIUrl = "http://localhost:5000/admin/";
  activeOrders: any;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }
  response: any;
  ngOnInit(): void {
    this.getActiveOrders();
    this.usermail = this.userService.getUserId();

  }

  getActiveOrders() {
    this.http.get(this.APIUrl + 'obtenerPedidosActivos').subscribe({
      next: response => {
        console.log(response);
        this.activeOrders = response;
        console.log(this.activeOrders[0]);
      }
    });
    

  }

  goToMenu() {
    this.router.navigate(['/menu-man']);
  }
  goToDishes() {
    this.router.navigate(['/admin']);
  }
  goToReports() {
    this.router.navigate(['/reports']);
  }
}
