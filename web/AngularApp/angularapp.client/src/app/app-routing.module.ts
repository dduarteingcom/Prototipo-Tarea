import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { AdminPlatosComponent } from './admin-platos/admin-platos.component';

const routes: Routes = [
  { path: '', redirectTo: 'chef', pathMatch: 'full' }, // Redirect to the login page by default
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPlatosComponent },
  { path: 'chef', component: OrderComponent }
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
