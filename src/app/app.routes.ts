import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

export const routes: Routes = [


  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/pages.component'),
    children: [
      {
        path: 'categoria',
        title: 'categoria',
        loadComponent: () => import('./pages/categoria/categoria.component')
      }
    ]
  }

  /*
    { 
        path: '', 
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
          
        ]
    },

    { path : 'login', component:LoginComponent},
   

    { path: '**', component: NopagefoundComponent },
    */
];
