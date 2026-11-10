import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siguienteEstado } from './vida.ts';

test('una célula viva sin vecinas muere de soledad', () => {
  assert.equal(siguienteEstado('viva', 0), 'muerta');
});

test('una célula viva con dos vecinas sobrevive', () => {
  assert.equal(siguienteEstado('viva', 2), 'viva');
});

test('una célula muerta con dos vecinas sigue muerta', () => {
  assert.equal(siguienteEstado('muerta', 2), 'muerta');
});
