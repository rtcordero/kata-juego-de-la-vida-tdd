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
