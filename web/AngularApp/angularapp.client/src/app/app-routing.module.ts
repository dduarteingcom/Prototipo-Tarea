import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { QueueComponent } from './queue/queue.component';
import { MenuComponent } from './menu/menu.component';
import { MenuManComponent } from './menu-man/menu-man.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to the login page by default
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'chef', component: OrderComponent },
  { path: 'queue', component: QueueComponent },
  { path: 'menu-man', component: MenuManComponent },
  { path: 'reports', component: ReportsComponent }
  // Add other routes as needed
];

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
