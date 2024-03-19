import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminPlatosComponent } from './admin-platos/admin-platos.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to the login page by default
  { path: 'login', component: LoginComponent }, { path: 'admin-platos', component: AdminPlatosComponent },
  { path: 'menu', component: MenuComponent }
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
