import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { UsuariosRegistradosComponent } from './list/usuarios-registrados.component';
import { UsuariosRegistradosDetailComponent } from './detail/usuarios-registrados-detail.component';
import { UsuariosRegistradosUpdateComponent } from './update/usuarios-registrados-update.component';
import UsuariosRegistradosResolve from './route/usuarios-registrados-routing-resolve.service';

const usuariosRegistradosRoute: Routes = [
  {
    path: '',
    component: UsuariosRegistradosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuariosRegistradosDetailComponent,
    resolve: {
      usuariosRegistrados: UsuariosRegistradosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuariosRegistradosUpdateComponent,
    resolve: {
      usuariosRegistrados: UsuariosRegistradosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuariosRegistradosUpdateComponent,
    resolve: {
      usuariosRegistrados: UsuariosRegistradosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default usuariosRegistradosRoute;
