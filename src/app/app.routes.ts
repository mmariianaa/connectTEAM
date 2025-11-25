import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'perfiladmin',
    loadComponent: () => import('./pages/perfiladmin/perfiladmin.page').then( m => m.PerfiladminPage)
  },
  {
    path: 'administrador',
    loadComponent: () => import('./pages/administrador/administrador.page').then( m => m.AdministradorPage)
  },

 {
  path:'perfilcolaborador',
  loadComponent: () => import('./pages/perfilcolaborador/perfilcolaborador.page').then( m => m.PerfilcolaboradorPage)

 },
  {
    path: 'mistablreosasignaciondetareas',
    loadComponent: () => import('./pages/mistablreosasignaciondetareas/mistablreosasignaciondetareas.page').then( m => m.MistablreosasignaciondetareasPage)
  },  {
    path: 'integrantes',
    loadComponent: () => import('./pages/integrantes/integrantes.page').then( m => m.IntegrantesPage)
  },
  {
    path: 'mistableroscolaborador',
    loadComponent: () => import('./pages/mistableroscolaborador/mistableroscolaborador.page').then( m => m.MistableroscolaboradorPage)
  },












];
