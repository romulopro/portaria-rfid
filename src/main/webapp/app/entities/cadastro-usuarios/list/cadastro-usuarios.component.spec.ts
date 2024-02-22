import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';

import { CadastroUsuariosComponent } from './cadastro-usuarios.component';

describe('CadastroUsuarios Management Component', () => {
  let comp: CadastroUsuariosComponent;
  let fixture: ComponentFixture<CadastroUsuariosComponent>;
  let service: CadastroUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'cadastro-usuarios', component: CadastroUsuariosComponent }]),
        HttpClientTestingModule,
        CadastroUsuariosComponent,
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
      .overrideTemplate(CadastroUsuariosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadastroUsuariosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CadastroUsuariosService);

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
    expect(comp.cadastroUsuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cadastroUsuariosService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCadastroUsuariosIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCadastroUsuariosIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
