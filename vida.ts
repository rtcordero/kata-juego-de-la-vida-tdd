export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  if (vecinasVivas === 3) return 'viva';
  return estado === 'viva' && vecinasVivas === 2 ? 'viva' : 'muerta';
}
