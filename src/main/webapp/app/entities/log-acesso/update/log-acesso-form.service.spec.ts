import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-acesso.test-samples';

import { LogAcessoFormService } from './log-acesso-form.service';

describe('LogAcesso Form Service', () => {
  let service: LogAcessoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogAcessoFormService);
  });

  describe('Service methods', () => {
    describe('createLogAcessoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogAcessoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoRfid: expect.any(Object),
            dataAcesso: expect.any(Object),
          }),
        );
      });

      it('passing ILogAcesso should create a new form with FormGroup', () => {
        const formGroup = service.createLogAcessoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoRfid: expect.any(Object),
            dataAcesso: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogAcesso', () => {
      it('should return NewLogAcesso for default LogAcesso initial value', () => {
        const formGroup = service.createLogAcessoFormGroup(sampleWithNewData);

        const logAcesso = service.getLogAcesso(formGroup) as any;

        expect(logAcesso).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogAcesso for empty LogAcesso initial value', () => {
        const formGroup = service.createLogAcessoFormGroup();

        const logAcesso = service.getLogAcesso(formGroup) as any;

        expect(logAcesso).toMatchObject({});
      });

      it('should return ILogAcesso', () => {
        const formGroup = service.createLogAcessoFormGroup(sampleWithRequiredData);

        const logAcesso = service.getLogAcesso(formGroup) as any;

        expect(logAcesso).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogAcesso should not enable id FormControl', () => {
        const formGroup = service.createLogAcessoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogAcesso should disable id FormControl', () => {
        const formGroup = service.createLogAcessoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
