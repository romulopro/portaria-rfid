import dayjs from 'dayjs/esm';

export interface ICadastroUsuarios {
  id: number;
  codigoRfid?: string | null;
  dataInclusao?: dayjs.Dayjs | null;
}

export type NewCadastroUsuarios = Omit<ICadastroUsuarios, 'id'> & { id: null };
