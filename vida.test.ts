import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siguienteEstado } from './vida.ts';

test('una célula viva sin vecinas muere de soledad', () => {
  assert.equal(siguienteEstado('viva', 0), 'muerta');
});
