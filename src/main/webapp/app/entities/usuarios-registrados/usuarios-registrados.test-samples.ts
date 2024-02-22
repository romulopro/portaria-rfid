import { IUsuariosRegistrados, NewUsuariosRegistrados } from './usuarios-registrados.model';

export const sampleWithRequiredData: IUsuariosRegistrados = {
  id: 18612,
  nome: 'depressive ew parallel',
  codigoRfid: 'dual astonishing cemetery',
};

export const sampleWithPartialData: IUsuariosRegistrados = {
  id: 26443,
  nome: 'briskly display conk',
  codigoRfid: 'what extroverted chunder',
};

export const sampleWithFullData: IUsuariosRegistrados = {
  id: 16846,
  nome: 'under wherever',
  codigoRfid: 'thin silently',
};

export const sampleWithNewData: NewUsuariosRegistrados = {
  nome: 'round above pivot',
  codigoRfid: 'terribly inasmuch refract',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
