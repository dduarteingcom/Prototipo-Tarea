import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-platos',
  templateUrl: './admin-platos.component.html',
  styleUrls: ['./admin-platos.component.css']
})
export class AdminPlatosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goHomepage() {
    this.router.navigate(['/menu']);
  }

}
