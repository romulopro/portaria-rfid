import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LogAcessoService } from '../service/log-acesso.service';
import { ILogAcesso } from '../log-acesso.model';
import { LogAcessoFormService } from './log-acesso-form.service';

import { LogAcessoUpdateComponent } from './log-acesso-update.component';

describe('LogAcesso Management Update Component', () => {
  let comp: LogAcessoUpdateComponent;
  let fixture: ComponentFixture<LogAcessoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logAcessoFormService: LogAcessoFormService;
  let logAcessoService: LogAcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), LogAcessoUpdateComponent],
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
      .overrideTemplate(LogAcessoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogAcessoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logAcessoFormService = TestBed.inject(LogAcessoFormService);
    logAcessoService = TestBed.inject(LogAcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logAcesso: ILogAcesso = { id: 456 };

      activatedRoute.data = of({ logAcesso });
      comp.ngOnInit();

      expect(comp.logAcesso).toEqual(logAcesso);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogAcesso>>();
      const logAcesso = { id: 123 };
      jest.spyOn(logAcessoFormService, 'getLogAcesso').mockReturnValue(logAcesso);
      jest.spyOn(logAcessoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAcesso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logAcesso }));
      saveSubject.complete();

      // THEN
      expect(logAcessoFormService.getLogAcesso).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logAcessoService.update).toHaveBeenCalledWith(expect.objectContaining(logAcesso));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogAcesso>>();
      const logAcesso = { id: 123 };
      jest.spyOn(logAcessoFormService, 'getLogAcesso').mockReturnValue({ id: null });
      jest.spyOn(logAcessoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAcesso: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logAcesso }));
      saveSubject.complete();

      // THEN
      expect(logAcessoFormService.getLogAcesso).toHaveBeenCalled();
      expect(logAcessoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogAcesso>>();
      const logAcesso = { id: 123 };
      jest.spyOn(logAcessoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logAcesso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logAcessoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
