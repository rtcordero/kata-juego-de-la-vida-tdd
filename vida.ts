export type Estado = 'viva' | 'muerta';

export function siguienteEstado(estado: Estado, vecinasVivas: number): Estado {
  const nace = estado === 'muerta' && vecinasVivas === 3;
  const sobrevive = estado === 'viva' && (vecinasVivas === 2 || vecinasVivas === 3);
  return nace || sobrevive ? 'viva' : 'muerta';
}

export type Celula = readonly [x: number, y: number];

export class Mundo {
  private readonly celulas: Celula[];

  constructor(celulas: Celula[]) {
    this.celulas = celulas;
  }

  celulasVivas(): Celula[] {
    return [...this.celulas].sort(([ax, ay], [bx, by]) => ay - by || ax - bx);
  }

  vecinasVivas([x, y]: Celula): number {
    return this.celulas.filter(([otraX, otraY]) => {
      const esLaMisma = otraX === x && otraY === y;
      const estaPegada = Math.abs(otraX - x) <= 1 && Math.abs(otraY - y) <= 1;
      return estaPegada && !esLaMisma;
    }).length;
  }

  siguienteGeneracion(): Mundo {
    const supervivientes = this.celulas.filter(
      (celula) => siguienteEstado('viva', this.vecinasVivas(celula)) === 'viva',
    );
    const nacidas = this.celulasMuertasDeAlrededor().filter(
      (celula) => siguienteEstado('muerta', this.vecinasVivas(celula)) === 'viva',
    );
    return new Mundo([...supervivientes, ...nacidas]);
  }

  private celulasMuertasDeAlrededor(): Celula[] {
    const muertas = new Map<string, Celula>();
    for (const [x, y] of this.celulas) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const celula: Celula = [x + dx, y + dy];
          if (!this.estaViva(celula)) muertas.set(`${x + dx},${y + dy}`, celula);
        }
      }
    }
    return [...muertas.values()];
  }

  private estaViva([x, y]: Celula): boolean {
    return this.celulas.some(([otraX, otraY]) => otraX === x && otraY === y);
  }
}
