export interface IUsuariosRegistrados {
  id: number;
  nome?: string | null;
  codigoRfid?: string | null;
}

export type NewUsuariosRegistrados = Omit<IUsuariosRegistrados, 'id'> & { id: null };
