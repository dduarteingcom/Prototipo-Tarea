import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'home-app',
      loadComponent: () => import('./core/pages/home-app/home.page.component').then((m) => m.HomePageComponent),
    },
    {
      path:'authentication',
      children:[
        {
          path:'log-in',
          loadComponent: () => import('./core/pages/authentication/log-in.page/log-in.page.component').then((m) => m.LogInPageComponent),
        },
        {
          path:'sign-up',
          loadComponent: () => import('./core/pages/authentication/sign-up.page/sign-up.page.component').then((m) => m.SignUpPageComponent),
          children:[

          ]
        },
        {
          path:'more',
          loadComponent: () =>import('./core/pages/authentication/sign-up.page/sign-up-more.page/sign-up-more.page.component').then((m)=>m.SignUpMorePageComponent)
          }
      ]
    },
    {
      path: '',
      redirectTo: 'home-app',
      pathMatch: 'full',
    },

];
