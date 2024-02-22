import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogAcesso, NewLogAcesso } from '../log-acesso.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogAcesso for edit and NewLogAcessoFormGroupInput for create.
 */
type LogAcessoFormGroupInput = ILogAcesso | PartialWithRequiredKeyOf<NewLogAcesso>;

type LogAcessoFormDefaults = Pick<NewLogAcesso, 'id'>;

type LogAcessoFormGroupContent = {
  id: FormControl<ILogAcesso['id'] | NewLogAcesso['id']>;
  codigoRfid: FormControl<ILogAcesso['codigoRfid']>;
  dataAcesso: FormControl<ILogAcesso['dataAcesso']>;
};

export type LogAcessoFormGroup = FormGroup<LogAcessoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogAcessoFormService {
  createLogAcessoFormGroup(logAcesso: LogAcessoFormGroupInput = { id: null }): LogAcessoFormGroup {
    const logAcessoRawValue = {
      ...this.getFormDefaults(),
      ...logAcesso,
    };
    return new FormGroup<LogAcessoFormGroupContent>({
      id: new FormControl(
        { value: logAcessoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigoRfid: new FormControl(logAcessoRawValue.codigoRfid, {
        validators: [Validators.required],
      }),
      dataAcesso: new FormControl(logAcessoRawValue.dataAcesso, {
        validators: [Validators.required],
      }),
    });
  }

  getLogAcesso(form: LogAcessoFormGroup): ILogAcesso | NewLogAcesso {
    return form.getRawValue() as ILogAcesso | NewLogAcesso;
  }

  resetForm(form: LogAcessoFormGroup, logAcesso: LogAcessoFormGroupInput): void {
    const logAcessoRawValue = { ...this.getFormDefaults(), ...logAcesso };
    form.reset(
      {
        ...logAcessoRawValue,
        id: { value: logAcessoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogAcessoFormDefaults {
    return {
      id: null,
    };
  }
}
