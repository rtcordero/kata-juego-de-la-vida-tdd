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
    const siguientes = this.celulasQueMirar().filter(
      (celula) => siguienteEstado(this.estadoDe(celula), this.vecinasVivas(celula)) === 'viva',
    );
    return new Mundo(siguientes);
  }

  // Las vivas y sus vecinas: más lejos no puede nacer nada.
  private celulasQueMirar(): Celula[] {
    const sinRepetir = new Map<string, Celula>();
    for (const [x, y] of this.celulas) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          sinRepetir.set(`${x + dx},${y + dy}`, [x + dx, y + dy]);
        }
      }
    }
    return [...sinRepetir.values()];
  }

  private estadoDe([x, y]: Celula): Estado {
    const viva = this.celulas.some(([otraX, otraY]) => otraX === x && otraY === y);
    return viva ? 'viva' : 'muerta';
  }
}
