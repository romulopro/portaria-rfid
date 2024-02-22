import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogAcessoService } from '../service/log-acesso.service';

import { LogAcessoComponent } from './log-acesso.component';

describe('LogAcesso Management Component', () => {
  let comp: LogAcessoComponent;
  let fixture: ComponentFixture<LogAcessoComponent>;
  let service: LogAcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'log-acesso', component: LogAcessoComponent }]),
        HttpClientTestingModule,
        LogAcessoComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(LogAcessoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogAcessoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LogAcessoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.logAcessos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to logAcessoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getLogAcessoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getLogAcessoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
