import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuariosRegistrados } from '../usuarios-registrados.model';
import { UsuariosRegistradosService } from '../service/usuarios-registrados.service';

export const usuariosRegistradosResolve = (route: ActivatedRouteSnapshot): Observable<null | IUsuariosRegistrados> => {
  const id = route.params['id'];
  if (id) {
    return inject(UsuariosRegistradosService)
      .find(id)
      .pipe(
        mergeMap((usuariosRegistrados: HttpResponse<IUsuariosRegistrados>) => {
          if (usuariosRegistrados.body) {
            return of(usuariosRegistrados.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default usuariosRegistradosResolve;
