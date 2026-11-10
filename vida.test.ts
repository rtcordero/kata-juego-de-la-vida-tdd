import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Mundo, siguienteEstado } from './vida.ts';

test('una célula viva sin vecinas muere de soledad', () => {
  assert.equal(siguienteEstado('viva', 0), 'muerta');
});

test('una célula viva con dos vecinas sobrevive', () => {
  assert.equal(siguienteEstado('viva', 2), 'viva');
});

test('una célula muerta con dos vecinas sigue muerta', () => {
  assert.equal(siguienteEstado('muerta', 2), 'muerta');
});

test('una célula viva con tres vecinas sobrevive', () => {
  assert.equal(siguienteEstado('viva', 3), 'viva');
});

test('una célula muerta con exactamente tres vecinas nace', () => {
  assert.equal(siguienteEstado('muerta', 3), 'viva');
});

test('una célula viva con cuatro vecinas muere por superpoblación', () => {
  assert.equal(siguienteEstado('viva', 4), 'muerta');
});

test('un mundo vacío no tiene células vivas', () => {
  const mundo = new Mundo([]);
  assert.deepEqual(mundo.celulasVivas(), []);
});

test('un mundo conoce las células vivas con las que empieza', () => {
  const mundo = new Mundo([[0, 0]]);
  assert.deepEqual(mundo.celulasVivas(), [[0, 0]]);
});

test('una célula sola no tiene vecinas vivas', () => {
  const mundo = new Mundo([[0, 0]]);
  assert.equal(mundo.vecinasVivas([0, 0]), 0);
});

test('cuenta una vecina pegada', () => {
  const mundo = new Mundo([[0, 0], [1, 0]]);
  assert.equal(mundo.vecinasVivas([0, 0]), 1);
});

test('una célula a dos casillas no es vecina', () => {
  const mundo = new Mundo([[0, 0], [2, 0]]);
  assert.equal(mundo.vecinasVivas([0, 0]), 0);
});

test('cuenta las ocho vecinas de alrededor, también en diagonal', () => {
  const mundo = new Mundo([
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [0, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
  ]);
  assert.equal(mundo.vecinasVivas([0, 0]), 8);
});

test('en la siguiente generación, una célula sola muere', () => {
  const mundo = new Mundo([[0, 0]]);
  assert.deepEqual(mundo.siguienteGeneracion().celulasVivas(), []);
});

test('un bloque de dos por dos no cambia', () => {
  const bloque = new Mundo([[0, 0], [1, 0], [0, 1], [1, 1]]);
  assert.deepEqual(bloque.siguienteGeneracion().celulasVivas(), [[0, 0], [1, 0], [0, 1], [1, 1]]);
});

test('devuelve las células vivas por filas, de arriba abajo y de izquierda a derecha', () => {
  const mundo = new Mundo([[1, 1], [0, 1], [5, 0]]);
  assert.deepEqual(mundo.celulasVivas(), [[5, 0], [0, 1], [1, 1]]);
});

test('un parpadeador pasa de horizontal a vertical', () => {
  const horizontal = new Mundo([[0, 1], [1, 1], [2, 1]]);
  assert.deepEqual(horizontal.siguienteGeneracion().celulasVivas(), [[1, 0], [1, 1], [1, 2]]);
});

test('un planeador, cuatro generaciones después, se ha movido una casilla en diagonal', () => {
  const planeador = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]] as const;
  let mundo = new Mundo([...planeador]);
  for (let generacion = 0; generacion < 4; generacion++) {
    mundo = mundo.siguienteGeneracion();
  }
  const desplazado = new Mundo(planeador.map(([x, y]) => [x + 1, y + 1] as const));
  assert.deepEqual(mundo.celulasVivas(), desplazado.celulasVivas());
});
