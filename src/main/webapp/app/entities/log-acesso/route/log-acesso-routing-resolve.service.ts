import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogAcesso } from '../log-acesso.model';
import { LogAcessoService } from '../service/log-acesso.service';

export const logAcessoResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogAcesso> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogAcessoService)
      .find(id)
      .pipe(
        mergeMap((logAcesso: HttpResponse<ILogAcesso>) => {
          if (logAcesso.body) {
            return of(logAcesso.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logAcessoResolve;
