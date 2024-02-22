import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';

export const cadastroUsuariosResolve = (route: ActivatedRouteSnapshot): Observable<null | ICadastroUsuarios> => {
  const id = route.params['id'];
  if (id) {
    return inject(CadastroUsuariosService)
      .find(id)
      .pipe(
        mergeMap((cadastroUsuarios: HttpResponse<ICadastroUsuarios>) => {
          if (cadastroUsuarios.body) {
            return of(cadastroUsuarios.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cadastroUsuariosResolve;
