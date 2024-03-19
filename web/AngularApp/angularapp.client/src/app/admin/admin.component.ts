import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Dish {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  //testList: Dish[] = [];
  dishList: Dish[] = [];
  inputBoxValue: string = '';
  dishIdCounter: number = 0;

  constructor(private router: Router) { }

  goHomepage() {
    this.router.navigate(['/menu']);
  }

  newDishT() {
    if (this.inputBoxValue.trim() !== '') {
      const newDish: Dish = {
        id: this.dishIdCounter++,
        name: this.inputBoxValue
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

  //newDish() {
  //  if (this.inputBoxValue.trim() !== '') {
  //    this.dishList.push(this.inputBoxValue);
  //    this.inputBoxValue = ''; // Clear input box after adding task
  //  }
  //  else {
  //    alert("You must type something!")}
  //}

}
