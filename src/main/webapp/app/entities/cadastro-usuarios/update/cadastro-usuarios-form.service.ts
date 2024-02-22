import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICadastroUsuarios, NewCadastroUsuarios } from '../cadastro-usuarios.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICadastroUsuarios for edit and NewCadastroUsuariosFormGroupInput for create.
 */
type CadastroUsuariosFormGroupInput = ICadastroUsuarios | PartialWithRequiredKeyOf<NewCadastroUsuarios>;

type CadastroUsuariosFormDefaults = Pick<NewCadastroUsuarios, 'id'>;

type CadastroUsuariosFormGroupContent = {
  id: FormControl<ICadastroUsuarios['id'] | NewCadastroUsuarios['id']>;
  codigoRfid: FormControl<ICadastroUsuarios['codigoRfid']>;
  dataInclusao: FormControl<ICadastroUsuarios['dataInclusao']>;
};

export type CadastroUsuariosFormGroup = FormGroup<CadastroUsuariosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CadastroUsuariosFormService {
  createCadastroUsuariosFormGroup(cadastroUsuarios: CadastroUsuariosFormGroupInput = { id: null }): CadastroUsuariosFormGroup {
    const cadastroUsuariosRawValue = {
      ...this.getFormDefaults(),
      ...cadastroUsuarios,
    };
    return new FormGroup<CadastroUsuariosFormGroupContent>({
      id: new FormControl(
        { value: cadastroUsuariosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigoRfid: new FormControl(cadastroUsuariosRawValue.codigoRfid, {
        validators: [Validators.required],
      }),
      dataInclusao: new FormControl(cadastroUsuariosRawValue.dataInclusao, {
        validators: [Validators.required],
      }),
    });
  }

  getCadastroUsuarios(form: CadastroUsuariosFormGroup): ICadastroUsuarios | NewCadastroUsuarios {
    return form.getRawValue() as ICadastroUsuarios | NewCadastroUsuarios;
  }

  resetForm(form: CadastroUsuariosFormGroup, cadastroUsuarios: CadastroUsuariosFormGroupInput): void {
    const cadastroUsuariosRawValue = { ...this.getFormDefaults(), ...cadastroUsuarios };
    form.reset(
      {
        ...cadastroUsuariosRawValue,
        id: { value: cadastroUsuariosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CadastroUsuariosFormDefaults {
    return {
      id: null,
    };
  }
}
