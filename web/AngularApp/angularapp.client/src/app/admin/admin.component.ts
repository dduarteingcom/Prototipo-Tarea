import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  taskList: string[] = [];
  inputBoxValue: string = '';

  constructor(private router: Router) { }

  goHomepage() {
    this.router.navigate(['/menu']);
  }

  newDish() {
    if (this.inputBoxValue.trim() !== '') {
      this.taskList.push(this.inputBoxValue);
      this.inputBoxValue = ''; // Clear input box after adding task
    }
  }

}
