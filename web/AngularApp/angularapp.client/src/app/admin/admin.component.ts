/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
  readonly APIUrl = "http://localhost:5000/plato/";
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
    this.http.get(this.APIUrl + 'mostrarPlatos').subscribe({
      next: response => {
        this.activeDishes = response;
        console.log(response);
      }
    });
  }

  toggleForm2() {
    this.showForm2 = !this.showForm2;
    this.showForm = false;
    this.showForm3 = false;
    this.getDefaultOptions();
  }
  toggleForm() {
    this.showForm = !this.showForm;
    this.showForm2 = false;
    this.showForm3 = false;
  }
  toggleForm3() {
    this.showForm2 = false;
    this.showForm = false;
    this.showForm3 = !this.showForm3;
    this.getDefaultOptions();
  }
  submitForm() { //Add Dish
    let datos = {
      nombre: this.dishName,
      tipo: this.dishType,
      calorias: this.dishCalories,
      precio: this.dishPrice,
      ingredientes: this.dishIngredients,
      duracion: this.dishTime,
      descripcion: this.dishDesc

    }

    this.http.post(this.APIUrl + 'agregarPlato', datos).subscribe(data => {
      this.getDishes();
    })
    this.showForm = !this.showForm;
  }
  submitForm2() { //Change dish
    this.http.put(this.APIUrl + 'modificarPlato?' + 'id=' + this.dishIDselection +'&nuevoNombre=' + this.dishName + '&nuevoTipo=' + this.dishType + '&nuevoCalorias=' + this.dishCalories + '&nuevoPrecio=' + this.dishPrice + '&nuevaDescripcion=' + this.dishDesc, 'agregarPlato').subscribe(data => {
      this.getDishes();
    })
    this.showForm2 = !this.showForm2;
  }
  submitForm3() { //Delete dish
    console.log("Delete")
    this.http.delete(this.APIUrl + 'eliminarPlato?' + 'id=' + this.dishIDselection).subscribe(data => {
      this.getDishes();
    })
    this.showForm3 = !this.showForm3;
  }

  getDefaultOptions(){
    this.http.get<number[]>(this.APIUrl + 'mostrarIdPlatos').subscribe({
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
