import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogAcesso, NewLogAcesso } from '../log-acesso.model';

export type PartialUpdateLogAcesso = Partial<ILogAcesso> & Pick<ILogAcesso, 'id'>;

type RestOf<T extends ILogAcesso | NewLogAcesso> = Omit<T, 'dataAcesso'> & {
  dataAcesso?: string | null;
};

export type RestLogAcesso = RestOf<ILogAcesso>;

export type NewRestLogAcesso = RestOf<NewLogAcesso>;

export type PartialUpdateRestLogAcesso = RestOf<PartialUpdateLogAcesso>;

export type EntityResponseType = HttpResponse<ILogAcesso>;
export type EntityArrayResponseType = HttpResponse<ILogAcesso[]>;

@Injectable({ providedIn: 'root' })
export class LogAcessoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/log-acessos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(logAcesso: NewLogAcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logAcesso);
    return this.http
      .post<RestLogAcesso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logAcesso: ILogAcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logAcesso);
    return this.http
      .put<RestLogAcesso>(`${this.resourceUrl}/${this.getLogAcessoIdentifier(logAcesso)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logAcesso: PartialUpdateLogAcesso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logAcesso);
    return this.http
      .patch<RestLogAcesso>(`${this.resourceUrl}/${this.getLogAcessoIdentifier(logAcesso)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestLogAcesso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogAcesso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogAcessoIdentifier(logAcesso: Pick<ILogAcesso, 'id'>): number {
    return logAcesso.id;
  }

  compareLogAcesso(o1: Pick<ILogAcesso, 'id'> | null, o2: Pick<ILogAcesso, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogAcessoIdentifier(o1) === this.getLogAcessoIdentifier(o2) : o1 === o2;
  }

  addLogAcessoToCollectionIfMissing<Type extends Pick<ILogAcesso, 'id'>>(
    logAcessoCollection: Type[],
    ...logAcessosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logAcessos: Type[] = logAcessosToCheck.filter(isPresent);
    if (logAcessos.length > 0) {
      const logAcessoCollectionIdentifiers = logAcessoCollection.map(logAcessoItem => this.getLogAcessoIdentifier(logAcessoItem)!);
      const logAcessosToAdd = logAcessos.filter(logAcessoItem => {
        const logAcessoIdentifier = this.getLogAcessoIdentifier(logAcessoItem);
        if (logAcessoCollectionIdentifiers.includes(logAcessoIdentifier)) {
          return false;
        }
        logAcessoCollectionIdentifiers.push(logAcessoIdentifier);
        return true;
      });
      return [...logAcessosToAdd, ...logAcessoCollection];
    }
    return logAcessoCollection;
  }

  protected convertDateFromClient<T extends ILogAcesso | NewLogAcesso | PartialUpdateLogAcesso>(logAcesso: T): RestOf<T> {
    return {
      ...logAcesso,
      dataAcesso: logAcesso.dataAcesso?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restLogAcesso: RestLogAcesso): ILogAcesso {
    return {
      ...restLogAcesso,
      dataAcesso: restLogAcesso.dataAcesso ? dayjs(restLogAcesso.dataAcesso) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLogAcesso>): HttpResponse<ILogAcesso> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLogAcesso[]>): HttpResponse<ILogAcesso[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
