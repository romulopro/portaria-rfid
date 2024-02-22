import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CadastroUsuariosService } from '../service/cadastro-usuarios.service';
import { ICadastroUsuarios } from '../cadastro-usuarios.model';
import { CadastroUsuariosFormService } from './cadastro-usuarios-form.service';

import { CadastroUsuariosUpdateComponent } from './cadastro-usuarios-update.component';

describe('CadastroUsuarios Management Update Component', () => {
  let comp: CadastroUsuariosUpdateComponent;
  let fixture: ComponentFixture<CadastroUsuariosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cadastroUsuariosFormService: CadastroUsuariosFormService;
  let cadastroUsuariosService: CadastroUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CadastroUsuariosUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CadastroUsuariosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadastroUsuariosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cadastroUsuariosFormService = TestBed.inject(CadastroUsuariosFormService);
    cadastroUsuariosService = TestBed.inject(CadastroUsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cadastroUsuarios: ICadastroUsuarios = { id: 456 };

      activatedRoute.data = of({ cadastroUsuarios });
      comp.ngOnInit();

      expect(comp.cadastroUsuarios).toEqual(cadastroUsuarios);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadastroUsuarios>>();
      const cadastroUsuarios = { id: 123 };
      jest.spyOn(cadastroUsuariosFormService, 'getCadastroUsuarios').mockReturnValue(cadastroUsuarios);
      jest.spyOn(cadastroUsuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroUsuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadastroUsuarios }));
      saveSubject.complete();

      // THEN
      expect(cadastroUsuariosFormService.getCadastroUsuarios).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cadastroUsuariosService.update).toHaveBeenCalledWith(expect.objectContaining(cadastroUsuarios));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadastroUsuarios>>();
      const cadastroUsuarios = { id: 123 };
      jest.spyOn(cadastroUsuariosFormService, 'getCadastroUsuarios').mockReturnValue({ id: null });
      jest.spyOn(cadastroUsuariosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroUsuarios: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadastroUsuarios }));
      saveSubject.complete();

      // THEN
      expect(cadastroUsuariosFormService.getCadastroUsuarios).toHaveBeenCalled();
      expect(cadastroUsuariosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadastroUsuarios>>();
      const cadastroUsuarios = { id: 123 };
      jest.spyOn(cadastroUsuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroUsuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cadastroUsuariosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
