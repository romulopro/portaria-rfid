import dayjs from 'dayjs/esm';

export interface ILogAcesso {
  id: number;
  codigoRfid?: string | null;
  dataAcesso?: dayjs.Dayjs | null;
}

export type NewLogAcesso = Omit<ILogAcesso, 'id'> & { id: null };
