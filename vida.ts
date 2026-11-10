export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  return vecinasVivas === 2 ? 'viva' : 'muerta';
}
