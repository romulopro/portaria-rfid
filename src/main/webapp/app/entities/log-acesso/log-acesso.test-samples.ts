import dayjs from 'dayjs/esm';

import { ILogAcesso, NewLogAcesso } from './log-acesso.model';

export const sampleWithRequiredData: ILogAcesso = {
  id: 6332,
  codigoRfid: 'pish whenever',
  dataAcesso: dayjs('2024-02-22'),
};

export const sampleWithPartialData: ILogAcesso = {
  id: 7620,
  codigoRfid: 'bah and',
  dataAcesso: dayjs('2024-02-22'),
};

export const sampleWithFullData: ILogAcesso = {
  id: 23547,
  codigoRfid: 'idle restfully',
  dataAcesso: dayjs('2024-02-22'),
};

export const sampleWithNewData: NewLogAcesso = {
  codigoRfid: 'geez tassel view',
  dataAcesso: dayjs('2024-02-22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
