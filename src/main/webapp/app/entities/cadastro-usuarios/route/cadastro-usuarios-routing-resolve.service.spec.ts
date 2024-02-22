import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';

import cadastroUsuariosResolve from './cadastro-usuarios-routing-resolve.service';

describe('CadastroUsuarios routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CadastroUsuariosService;
  let resultCadastroUsuarios: ICadastroUsuarios | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(CadastroUsuariosService);
    resultCadastroUsuarios = undefined;
  });

  describe('resolve', () => {
    it('should return ICadastroUsuarios returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cadastroUsuariosResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCadastroUsuarios = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCadastroUsuarios).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cadastroUsuariosResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCadastroUsuarios = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCadastroUsuarios).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICadastroUsuarios>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cadastroUsuariosResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCadastroUsuarios = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCadastroUsuarios).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
