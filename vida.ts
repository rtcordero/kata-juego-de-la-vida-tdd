export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  const nace = estado === 'muerta' && vecinasVivas === 3;
  const sobrevive = estado === 'viva' && (vecinasVivas === 2 || vecinasVivas === 3);
  return nace || sobrevive ? 'viva' : 'muerta';
}

export type Celula = readonly [x: number, y: number];

export class Mundo {
  constructor(celulas: Celula[]) {}

  celulasVivas(): Celula[] {
    return [];
  }
}
