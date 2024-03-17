import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'authenticathion',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    loadComponent: () => import('./pages/authentication/authentication.page').then( m => m.AuthenticationPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/carrito/carrito.page').then( m => m.CarritoPage)
  },
  {
    path: 'log-in',
    loadComponent: () => import('./pages/authentication/log-in/log-in.page').then( m => m.LogInPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/authentication/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'sign-up-more',
    loadComponent: () => import('./pages/authentication/sign-up/sign-up-more/sign-up-more.page').then( m => m.SignUpMorePage)
  },

];
