import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogAcessoComponent } from './list/log-acesso.component';
import { LogAcessoDetailComponent } from './detail/log-acesso-detail.component';
import { LogAcessoUpdateComponent } from './update/log-acesso-update.component';
import LogAcessoResolve from './route/log-acesso-routing-resolve.service';

const logAcessoRoute: Routes = [
  {
    path: '',
    component: LogAcessoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogAcessoDetailComponent,
    resolve: {
      logAcesso: LogAcessoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogAcessoUpdateComponent,
    resolve: {
      logAcesso: LogAcessoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogAcessoUpdateComponent,
    resolve: {
      logAcesso: LogAcessoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logAcessoRoute;
