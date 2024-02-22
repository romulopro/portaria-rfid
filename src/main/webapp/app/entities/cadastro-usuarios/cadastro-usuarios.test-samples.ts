import dayjs from 'dayjs/esm';

import { ICadastroUsuarios, NewCadastroUsuarios } from './cadastro-usuarios.model';

export const sampleWithRequiredData: ICadastroUsuarios = {
  id: 2708,
  codigoRfid: 'airforce wee',
  dataInclusao: dayjs('2024-02-22'),
};

export const sampleWithPartialData: ICadastroUsuarios = {
  id: 19782,
  codigoRfid: 'extremely',
  dataInclusao: dayjs('2024-02-22'),
};

export const sampleWithFullData: ICadastroUsuarios = {
  id: 29251,
  codigoRfid: 'phew',
  dataInclusao: dayjs('2024-02-22'),
};

export const sampleWithNewData: NewCadastroUsuarios = {
  codigoRfid: 'tangible snow',
  dataInclusao: dayjs('2024-02-22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
