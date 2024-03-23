/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Dish {
  id: number;
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-menu-man',
  templateUrl: './menu-man.component.html',
  styleUrl: './menu-man.component.css'
})
export class MenuManComponent implements OnInit {
  platosDisponibles: any;
  defaultOptions: number[] = [];
  formData: any = {
    selectedOptionId: ''
  };
  selectedId: number = 0;
  dishIDselection: number = 0;
  productInfo: any = {};
  showForm: boolean = false;
  showForm2: boolean = false;
  showForm3: boolean = false;
  //testList: Dish[] = [];
  dishList: Dish[] = [];
  inputBoxValue: string = '';
  dishIdCounter: number = 0;
  readonly APIUrl = "http://localhost:5000/menu/";
  activeDishes: any;
  dishName: string = '';
  dishType: string = '';
  dishCalories: number = 0;
  dishPrice: number = 0;
  dishIngredients: string[] = [];
  dishTime = 0;
  dishDesc = '';
  count = 0;

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
    this.http.get(this.APIUrl + 'mostrarPlatosDisponibles').subscribe({
      next: response => {
        this.activeDishes = response;
      }
    });
  }

  getPlatos() {
    this.http.get("http://localhost:5000/plato/" + 'mostrarPlatos').subscribe({
      next: response => {
        this.platosDisponibles = response;
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showForm2 = false;
    this.showForm3 = false;
    this.getDefaultOptions();
    this.getPlatos();
  }
  toggleForm3() {
    this.showForm2 = false;
    this.showForm = false;
    this.showForm3 = !this.showForm3;
    this.getDefaultOptions();
  }
  submitForm() { //Add Dish

    this.http.post(this.APIUrl + 'agregarPlatoAlMenu?' + 'id=' + this.dishIDselection, 'datos').subscribe(data => {
      this.getDishes();
    })
    this.showForm = !this.showForm;
  }
  submitForm3() { //Delete dish
    console.log("Delete")
    this.http.delete(this.APIUrl + 'eliminarPlatoDelMenu?' + 'id=' + this.dishIDselection).subscribe(data => {
      this.getDishes();
    })
    this.showForm3 = !this.showForm3;
  }

  getDefaultOptions() {
    this.http.get<number[]>("http://localhost:5000/plato/" + 'mostrarIdPlatos').subscribe({
      next: response => {
        this.defaultOptions = response;
      }
    });

  }

  onSelectionChange(event: Event) {
    const selectedValue = Number((event.target as HTMLSelectElement).value);
    this.dishIDselection = selectedValue;
    this.count = 0;
    for (let option of this.activeDishes) {
      this.count = this.count + 1;
      if (this.count == selectedValue) {
        this.dishName = option.nombre;
        this.dishType = option.tipo
        this.dishCalories = option.calorias
        this.dishPrice = option.precio
        this.dishIngredients = Array(option.Ingredients)
        this.dishTime = option.duracion
        this.dishDesc = option.descripcion
      }
    }
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
