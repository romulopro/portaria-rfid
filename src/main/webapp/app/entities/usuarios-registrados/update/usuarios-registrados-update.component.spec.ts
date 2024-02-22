import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuariosRegistradosService } from '../service/usuarios-registrados.service';
import { IUsuariosRegistrados } from '../usuarios-registrados.model';
import { UsuariosRegistradosFormService } from './usuarios-registrados-form.service';

import { UsuariosRegistradosUpdateComponent } from './usuarios-registrados-update.component';

describe('UsuariosRegistrados Management Update Component', () => {
  let comp: UsuariosRegistradosUpdateComponent;
  let fixture: ComponentFixture<UsuariosRegistradosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuariosRegistradosFormService: UsuariosRegistradosFormService;
  let usuariosRegistradosService: UsuariosRegistradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), UsuariosRegistradosUpdateComponent],
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
      .overrideTemplate(UsuariosRegistradosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosRegistradosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuariosRegistradosFormService = TestBed.inject(UsuariosRegistradosFormService);
    usuariosRegistradosService = TestBed.inject(UsuariosRegistradosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const usuariosRegistrados: IUsuariosRegistrados = { id: 456 };

      activatedRoute.data = of({ usuariosRegistrados });
      comp.ngOnInit();

      expect(comp.usuariosRegistrados).toEqual(usuariosRegistrados);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuariosRegistrados>>();
      const usuariosRegistrados = { id: 123 };
      jest.spyOn(usuariosRegistradosFormService, 'getUsuariosRegistrados').mockReturnValue(usuariosRegistrados);
      jest.spyOn(usuariosRegistradosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuariosRegistrados });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuariosRegistrados }));
      saveSubject.complete();

      // THEN
      expect(usuariosRegistradosFormService.getUsuariosRegistrados).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuariosRegistradosService.update).toHaveBeenCalledWith(expect.objectContaining(usuariosRegistrados));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuariosRegistrados>>();
      const usuariosRegistrados = { id: 123 };
      jest.spyOn(usuariosRegistradosFormService, 'getUsuariosRegistrados').mockReturnValue({ id: null });
      jest.spyOn(usuariosRegistradosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuariosRegistrados: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuariosRegistrados }));
      saveSubject.complete();

      // THEN
      expect(usuariosRegistradosFormService.getUsuariosRegistrados).toHaveBeenCalled();
      expect(usuariosRegistradosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuariosRegistrados>>();
      const usuariosRegistrados = { id: 123 };
      jest.spyOn(usuariosRegistradosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuariosRegistrados });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuariosRegistradosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
