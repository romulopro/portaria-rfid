import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuariosRegistrados, NewUsuariosRegistrados } from '../usuarios-registrados.model';

export type PartialUpdateUsuariosRegistrados = Partial<IUsuariosRegistrados> & Pick<IUsuariosRegistrados, 'id'>;

export type EntityResponseType = HttpResponse<IUsuariosRegistrados>;
export type EntityArrayResponseType = HttpResponse<IUsuariosRegistrados[]>;

@Injectable({ providedIn: 'root' })
export class UsuariosRegistradosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuarios-registrados');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(usuariosRegistrados: NewUsuariosRegistrados): Observable<EntityResponseType> {
    return this.http.post<IUsuariosRegistrados>(this.resourceUrl, usuariosRegistrados, { observe: 'response' });
  }

  update(usuariosRegistrados: IUsuariosRegistrados): Observable<EntityResponseType> {
    return this.http.put<IUsuariosRegistrados>(
      `${this.resourceUrl}/${this.getUsuariosRegistradosIdentifier(usuariosRegistrados)}`,
      usuariosRegistrados,
      { observe: 'response' },
    );
  }

  partialUpdate(usuariosRegistrados: PartialUpdateUsuariosRegistrados): Observable<EntityResponseType> {
    return this.http.patch<IUsuariosRegistrados>(
      `${this.resourceUrl}/${this.getUsuariosRegistradosIdentifier(usuariosRegistrados)}`,
      usuariosRegistrados,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuariosRegistrados>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsuariosRegistrados[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUsuariosRegistradosIdentifier(usuariosRegistrados: Pick<IUsuariosRegistrados, 'id'>): number {
    return usuariosRegistrados.id;
  }

  compareUsuariosRegistrados(o1: Pick<IUsuariosRegistrados, 'id'> | null, o2: Pick<IUsuariosRegistrados, 'id'> | null): boolean {
    return o1 && o2 ? this.getUsuariosRegistradosIdentifier(o1) === this.getUsuariosRegistradosIdentifier(o2) : o1 === o2;
  }

  addUsuariosRegistradosToCollectionIfMissing<Type extends Pick<IUsuariosRegistrados, 'id'>>(
    usuariosRegistradosCollection: Type[],
    ...usuariosRegistradosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const usuariosRegistrados: Type[] = usuariosRegistradosToCheck.filter(isPresent);
    if (usuariosRegistrados.length > 0) {
      const usuariosRegistradosCollectionIdentifiers = usuariosRegistradosCollection.map(
        usuariosRegistradosItem => this.getUsuariosRegistradosIdentifier(usuariosRegistradosItem)!,
      );
      const usuariosRegistradosToAdd = usuariosRegistrados.filter(usuariosRegistradosItem => {
        const usuariosRegistradosIdentifier = this.getUsuariosRegistradosIdentifier(usuariosRegistradosItem);
        if (usuariosRegistradosCollectionIdentifiers.includes(usuariosRegistradosIdentifier)) {
          return false;
        }
        usuariosRegistradosCollectionIdentifiers.push(usuariosRegistradosIdentifier);
        return true;
      });
      return [...usuariosRegistradosToAdd, ...usuariosRegistradosCollection];
    }
    return usuariosRegistradosCollection;
  }
}
