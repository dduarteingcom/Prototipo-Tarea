/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Dish {
  id: number;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  defaultOptions: any[] = [];
  formData: any = {
    selectedOptionId: ''
  };
  showForm: boolean = false;
  showForm2: boolean = false;
  //testList: Dish[] = [];
  dishList: Dish[] = [];
  inputBoxValue: string = '';
  dishIdCounter: number = 0;
  readonly APIUrl = "https://localhost:7258/plato/";
  activeDishes: any;
  dishName: string = '';
  dishType: string = '';
  dishCalories: number = 0;
  dishPrice: number = 0;
  

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getDefaultOptions;
    this.getDishes();
  }

  goHomepage() {
    this.router.navigate(['/menu']);
  }

  newDishT() {
    if (this.inputBoxValue.trim() !== '') {
      const newDish: Dish = {
        id: this.dishIdCounter++,
        name: this.inputBoxValue,
        active: false
      };
      this.dishList.push(newDish);
      this.inputBoxValue = ''; // Clear input box after adding task
    }
    else {
      alert("You must type something!")
    }
  }

  deleteDish(dishId: number) {
    this.dishList = this.dishList.filter(dish => dish.id !== dishId);
  }

  getDishes() {
    this.http.get(this.APIUrl + 'obtenerPlatos').subscribe({
      next: response => {
        this.activeDishes = response;
      }
    });
  }

  toggleForm2() {
    this.showForm2 = !this.showForm;
    this.showForm = false;
  }
  toggleForm() {
    this.showForm = !this.showForm;
    this.showForm2 = false;
  }
  submitForm() {
    this.http.post(this.APIUrl + 'agregarPlato?' + 'nombre=' + this.dishName + '&tipo=' + this.dishType + '&calorias=' + this.dishCalories + '&precio=' + this.dishPrice, 'agregarPlato').subscribe(data => {
      this.getDishes();
    })
    this.showForm = !this.showForm;
  }
  submitForm2() {
    this.http.post(this.APIUrl + 'agregarPlato?' + 'nombre=' + this.dishName + '&tipo=' + this.dishType + '&calorias=' + this.dishCalories + '&precio=' + this.dishPrice, 'agregarPlato').subscribe(data => {
      this.getDishes();
    })
    this.showForm = !this.showForm;
  }

  getDefaultOptions(){
    this.http.get(this.APIUrl + 'obtenerPlatos').subscribe({
      next: response => {
        this.defaultOptions = response;
      }
    });
  }

  //newDish() {
  //  if (this.inputBoxValue.trim() !== '') {
  //    this.dishList.push(this.inputBoxValue);
  //    this.inputBoxValue = ''; // Clear input box after adding task
  //  }
  //  else {
  //    alert("You must type something!")}
  //}

}
