import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cadastro-usuarios.test-samples';

import { CadastroUsuariosFormService } from './cadastro-usuarios-form.service';

describe('CadastroUsuarios Form Service', () => {
  let service: CadastroUsuariosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroUsuariosFormService);
  });

  describe('Service methods', () => {
    describe('createCadastroUsuariosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCadastroUsuariosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoRfid: expect.any(Object),
            dataInclusao: expect.any(Object),
          }),
        );
      });

      it('passing ICadastroUsuarios should create a new form with FormGroup', () => {
        const formGroup = service.createCadastroUsuariosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoRfid: expect.any(Object),
            dataInclusao: expect.any(Object),
          }),
        );
      });
    });

    describe('getCadastroUsuarios', () => {
      it('should return NewCadastroUsuarios for default CadastroUsuarios initial value', () => {
        const formGroup = service.createCadastroUsuariosFormGroup(sampleWithNewData);

        const cadastroUsuarios = service.getCadastroUsuarios(formGroup) as any;

        expect(cadastroUsuarios).toMatchObject(sampleWithNewData);
      });

      it('should return NewCadastroUsuarios for empty CadastroUsuarios initial value', () => {
        const formGroup = service.createCadastroUsuariosFormGroup();

        const cadastroUsuarios = service.getCadastroUsuarios(formGroup) as any;

        expect(cadastroUsuarios).toMatchObject({});
      });

      it('should return ICadastroUsuarios', () => {
        const formGroup = service.createCadastroUsuariosFormGroup(sampleWithRequiredData);

        const cadastroUsuarios = service.getCadastroUsuarios(formGroup) as any;

        expect(cadastroUsuarios).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICadastroUsuarios should not enable id FormControl', () => {
        const formGroup = service.createCadastroUsuariosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCadastroUsuarios should disable id FormControl', () => {
        const formGroup = service.createCadastroUsuariosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
