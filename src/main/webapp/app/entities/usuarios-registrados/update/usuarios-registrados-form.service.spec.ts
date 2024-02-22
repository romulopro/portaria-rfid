import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../usuarios-registrados.test-samples';

import { UsuariosRegistradosFormService } from './usuarios-registrados-form.service';

describe('UsuariosRegistrados Form Service', () => {
  let service: UsuariosRegistradosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosRegistradosFormService);
  });

  describe('Service methods', () => {
    describe('createUsuariosRegistradosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            codigoRfid: expect.any(Object),
          }),
        );
      });

      it('passing IUsuariosRegistrados should create a new form with FormGroup', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            codigoRfid: expect.any(Object),
          }),
        );
      });
    });

    describe('getUsuariosRegistrados', () => {
      it('should return NewUsuariosRegistrados for default UsuariosRegistrados initial value', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup(sampleWithNewData);

        const usuariosRegistrados = service.getUsuariosRegistrados(formGroup) as any;

        expect(usuariosRegistrados).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsuariosRegistrados for empty UsuariosRegistrados initial value', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup();

        const usuariosRegistrados = service.getUsuariosRegistrados(formGroup) as any;

        expect(usuariosRegistrados).toMatchObject({});
      });

      it('should return IUsuariosRegistrados', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup(sampleWithRequiredData);

        const usuariosRegistrados = service.getUsuariosRegistrados(formGroup) as any;

        expect(usuariosRegistrados).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsuariosRegistrados should not enable id FormControl', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsuariosRegistrados should disable id FormControl', () => {
        const formGroup = service.createUsuariosRegistradosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
