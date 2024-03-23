import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FeedbackPage implements OnInit {


  constructor(
    private _router: Router,
    private _facturaService : FacturaService
    ) { }

  ngOnInit() {
  }

  goHome(){
    this._router.navigate(['/home']);
  }


  
}
