export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  const nace = estado === 'muerta' && vecinasVivas === 3;
  const sobrevive = estado === 'viva' && (vecinasVivas === 2 || vecinasVivas === 3);
  return nace || sobrevive ? 'viva' : 'muerta';
}
