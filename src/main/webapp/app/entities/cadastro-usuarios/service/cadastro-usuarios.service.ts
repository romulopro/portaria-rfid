import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICadastroUsuarios, NewCadastroUsuarios } from '../cadastro-usuarios.model';

export type PartialUpdateCadastroUsuarios = Partial<ICadastroUsuarios> & Pick<ICadastroUsuarios, 'id'>;

type RestOf<T extends ICadastroUsuarios | NewCadastroUsuarios> = Omit<T, 'dataInclusao'> & {
  dataInclusao?: string | null;
};

export type RestCadastroUsuarios = RestOf<ICadastroUsuarios>;

export type NewRestCadastroUsuarios = RestOf<NewCadastroUsuarios>;

export type PartialUpdateRestCadastroUsuarios = RestOf<PartialUpdateCadastroUsuarios>;

export type EntityResponseType = HttpResponse<ICadastroUsuarios>;
export type EntityArrayResponseType = HttpResponse<ICadastroUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class CadastroUsuariosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cadastro-usuarios');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(cadastroUsuarios: NewCadastroUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cadastroUsuarios);
    return this.http
      .post<RestCadastroUsuarios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cadastroUsuarios: ICadastroUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cadastroUsuarios);
    return this.http
      .put<RestCadastroUsuarios>(`${this.resourceUrl}/${this.getCadastroUsuariosIdentifier(cadastroUsuarios)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cadastroUsuarios: PartialUpdateCadastroUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cadastroUsuarios);
    return this.http
      .patch<RestCadastroUsuarios>(`${this.resourceUrl}/${this.getCadastroUsuariosIdentifier(cadastroUsuarios)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCadastroUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCadastroUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCadastroUsuariosIdentifier(cadastroUsuarios: Pick<ICadastroUsuarios, 'id'>): number {
    return cadastroUsuarios.id;
  }

  compareCadastroUsuarios(o1: Pick<ICadastroUsuarios, 'id'> | null, o2: Pick<ICadastroUsuarios, 'id'> | null): boolean {
    return o1 && o2 ? this.getCadastroUsuariosIdentifier(o1) === this.getCadastroUsuariosIdentifier(o2) : o1 === o2;
  }

  addCadastroUsuariosToCollectionIfMissing<Type extends Pick<ICadastroUsuarios, 'id'>>(
    cadastroUsuariosCollection: Type[],
    ...cadastroUsuariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cadastroUsuarios: Type[] = cadastroUsuariosToCheck.filter(isPresent);
    if (cadastroUsuarios.length > 0) {
      const cadastroUsuariosCollectionIdentifiers = cadastroUsuariosCollection.map(
        cadastroUsuariosItem => this.getCadastroUsuariosIdentifier(cadastroUsuariosItem)!,
      );
      const cadastroUsuariosToAdd = cadastroUsuarios.filter(cadastroUsuariosItem => {
        const cadastroUsuariosIdentifier = this.getCadastroUsuariosIdentifier(cadastroUsuariosItem);
        if (cadastroUsuariosCollectionIdentifiers.includes(cadastroUsuariosIdentifier)) {
          return false;
        }
        cadastroUsuariosCollectionIdentifiers.push(cadastroUsuariosIdentifier);
        return true;
      });
      return [...cadastroUsuariosToAdd, ...cadastroUsuariosCollection];
    }
    return cadastroUsuariosCollection;
  }

  protected convertDateFromClient<T extends ICadastroUsuarios | NewCadastroUsuarios | PartialUpdateCadastroUsuarios>(
    cadastroUsuarios: T,
  ): RestOf<T> {
    return {
      ...cadastroUsuarios,
      dataInclusao: cadastroUsuarios.dataInclusao?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCadastroUsuarios: RestCadastroUsuarios): ICadastroUsuarios {
    return {
      ...restCadastroUsuarios,
      dataInclusao: restCadastroUsuarios.dataInclusao ? dayjs(restCadastroUsuarios.dataInclusao) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCadastroUsuarios>): HttpResponse<ICadastroUsuarios> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCadastroUsuarios[]>): HttpResponse<ICadastroUsuarios[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
