import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CadastroUsuariosComponent } from './list/cadastro-usuarios.component';
import { CadastroUsuariosDetailComponent } from './detail/cadastro-usuarios-detail.component';
import { CadastroUsuariosUpdateComponent } from './update/cadastro-usuarios-update.component';
import CadastroUsuariosResolve from './route/cadastro-usuarios-routing-resolve.service';

const cadastroUsuariosRoute: Routes = [
  {
    path: '',
    component: CadastroUsuariosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CadastroUsuariosDetailComponent,
    resolve: {
      cadastroUsuarios: CadastroUsuariosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CadastroUsuariosUpdateComponent,
    resolve: {
      cadastroUsuarios: CadastroUsuariosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CadastroUsuariosUpdateComponent,
    resolve: {
      cadastroUsuarios: CadastroUsuariosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cadastroUsuariosRoute;
