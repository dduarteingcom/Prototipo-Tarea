import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { QueueComponent } from './queue/queue.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { DishOptComponent } from './dish-opt/dish-opt.component';
import { MenuManComponent } from './menu-man/menu-man.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    LoginComponent,
    OrderComponent,
    QueueComponent,
    DishOptComponent,
    MenuManComponent,
    ReportsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
