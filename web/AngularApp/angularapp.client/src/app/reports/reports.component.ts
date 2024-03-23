/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  usermail!: string;
  readonly APIUrl = "http://localhost:5000/admin/";
  activeOrders: any;
  showForm: boolean = false;
  showForm2: boolean = false;
  showForm3: boolean = false;
  showForm4: boolean = false;
  topPlatos: any;
  topGanancias: any;
  topClientes: any;
  topRated: any;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }
  response: any;
  ngOnInit(): void {
    this.usermail = this.userService.getUserId();

  }


  goToMenu() {
    this.http.get(this.APIUrl + 'mostrarTopPlatos').subscribe({
      next: response => {
        this.topPlatos = response;
        this.showForm = !this.showForm;
        this.showForm2 = false;
        this.showForm3 = false;
        this.showForm4 = false;
      }
    });
    
  }
  goToDishes() {
    this.http.get(this.APIUrl + 'mostrarTopGanancias').subscribe({
      next: response => {
        this.topGanancias = response;
        this.showForm2 = !this.showForm2;
        this.showForm = false;
        this.showForm3 = false;
        this.showForm4 = false;
      }
    });
    
  }
  goToReports() {

    this.http.get(this.APIUrl + 'mostrarTopClientes').subscribe({
      next: response => {
        this.topClientes = response;
        this.showForm3 = !this.showForm3;
        this.showForm2 = false;
        this.showForm = false;
        this.showForm4 = false;
      }
    });
   
  }
  bestRated() {

    this.http.get(this.APIUrl + 'mostrarTopClientes').subscribe({
      next: response => {
        this.topRated = response;
        this.showForm4 = !this.showForm4;
        this.showForm2 = false;
        this.showForm = false;
        this.showForm3 = false;
      }
    });

  }
}
