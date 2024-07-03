import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

export  const routes: Routes = [


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
      },
      {
        path: 'especialidad',
        title: 'especialidad',
        loadComponent: () => import('./pages/especialidad/especialidad.component')
      },
      {
        path: 'cita',
        title: 'cita',
        loadComponent: () => import('./pages/cita/cita.component')
      },
      {
        path: 'usuario',
        title: 'Usuario',
        loadComponent: () => import('./pages/usuario/usuario.component')
      },
      {
        path: 'medico',
        title: 'Medico',
        loadComponent: () => import('./pages/medico/medico.component')
      }
      ,
      {
        path: 'paciente',
        title: 'paciente',
        loadComponent: () => import('./pages/paciente/paciente.component')
      }
      ,
      {
        path: 'medicamento',
        title: 'medicamento',
        loadComponent: () => import('./pages/medicamento/medicamento.component')
      },
      {
        path: 'historia-clinica',
        title: 'Historia Clinica',
        loadComponent: () => import('./pages/historia-clinica/historia-clinica.component')
      },
      {
        path: 'receta-medica',
        title: 'Receta Medica',
        loadComponent: () => import('./pages/receta/receta.component')
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
