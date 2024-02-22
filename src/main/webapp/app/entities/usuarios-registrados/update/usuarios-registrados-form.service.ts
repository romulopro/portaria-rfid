import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuariosRegistrados, NewUsuariosRegistrados } from '../usuarios-registrados.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuariosRegistrados for edit and NewUsuariosRegistradosFormGroupInput for create.
 */
type UsuariosRegistradosFormGroupInput = IUsuariosRegistrados | PartialWithRequiredKeyOf<NewUsuariosRegistrados>;

type UsuariosRegistradosFormDefaults = Pick<NewUsuariosRegistrados, 'id'>;

type UsuariosRegistradosFormGroupContent = {
  id: FormControl<IUsuariosRegistrados['id'] | NewUsuariosRegistrados['id']>;
  nome: FormControl<IUsuariosRegistrados['nome']>;
  codigoRfid: FormControl<IUsuariosRegistrados['codigoRfid']>;
};

export type UsuariosRegistradosFormGroup = FormGroup<UsuariosRegistradosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuariosRegistradosFormService {
  createUsuariosRegistradosFormGroup(usuariosRegistrados: UsuariosRegistradosFormGroupInput = { id: null }): UsuariosRegistradosFormGroup {
    const usuariosRegistradosRawValue = {
      ...this.getFormDefaults(),
      ...usuariosRegistrados,
    };
    return new FormGroup<UsuariosRegistradosFormGroupContent>({
      id: new FormControl(
        { value: usuariosRegistradosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nome: new FormControl(usuariosRegistradosRawValue.nome, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      codigoRfid: new FormControl(usuariosRegistradosRawValue.codigoRfid, {
        validators: [Validators.required],
      }),
    });
  }

  getUsuariosRegistrados(form: UsuariosRegistradosFormGroup): IUsuariosRegistrados | NewUsuariosRegistrados {
    return form.getRawValue() as IUsuariosRegistrados | NewUsuariosRegistrados;
  }

  resetForm(form: UsuariosRegistradosFormGroup, usuariosRegistrados: UsuariosRegistradosFormGroupInput): void {
    const usuariosRegistradosRawValue = { ...this.getFormDefaults(), ...usuariosRegistrados };
    form.reset(
      {
        ...usuariosRegistradosRawValue,
        id: { value: usuariosRegistradosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): UsuariosRegistradosFormDefaults {
    return {
      id: null,
    };
  }
}
