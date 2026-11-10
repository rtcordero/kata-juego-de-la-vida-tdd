export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  return estado === 'viva' && vecinasVivas === 2 ? 'viva' : 'muerta';
}
