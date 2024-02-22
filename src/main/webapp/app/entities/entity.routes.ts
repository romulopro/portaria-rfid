import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuarios-registrados',
    data: { pageTitle: 'portariaRfidApp.usuariosRegistrados.home.title' },
    loadChildren: () => import('./usuarios-registrados/usuarios-registrados.routes'),
  },
  {
    path: 'cadastro-usuarios',
    data: { pageTitle: 'portariaRfidApp.cadastroUsuarios.home.title' },
    loadChildren: () => import('./cadastro-usuarios/cadastro-usuarios.routes'),
  },
  {
    path: 'log-acesso',
    data: { pageTitle: 'portariaRfidApp.logAcesso.home.title' },
    loadChildren: () => import('./log-acesso/log-acesso.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
