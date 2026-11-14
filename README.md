# Kata del Juego de la Vida de Conway con TDD

Es el código del artículo [Juego de la Vida de Conway: la kata resuelta con TDD](https://rubentejera.com/juego-de-la-vida-conway-kata-tdd/), que explica cada paso.

Con una kata de cuadrícula es fácil bloquearse en el primer test: ¿el tablero?, ¿un patrón entero que se mueve? Este repositorio resuelve el Juego de la Vida con TDD de dentro afuera: primero la regla de una sola célula, después el recuento de vecinas y al final la generación completa, con el bloque, el parpadeador y el planeador como pruebas.

Lo que demuestra está en el **historial**: un commit por cada fase del ciclo rojo-verde-refactor, y cada commit falla o pasa exactamente como dice su mensaje.

## La kata

Un tablero infinito de células vivas o muertas cambia de generación en generación. Cada célula tiene ocho vecinas, también en diagonal, y todas cambian a la vez:

- Una célula viva con 0 o 1 vecinas vivas muere.
- Una célula viva con 2 o 3 vecinas vivas sigue viva.
- Una célula viva con 4 o más vecinas vivas muere.
- Una célula muerta con exactamente 3 vecinas vivas nace.

Representar el mundo como la lista de células vivas, en un plano sin bordes, es una decisión de este repositorio. [Coding Dojo](https://codingdojo.org/kata/GameOfLife/) propone una variante con una cuadrícula finita.

## Cómo ejecutarlo

Necesitas Node.js 24.12 o posterior (la versión fijada está en `.node-version`). Node ejecuta TypeScript directamente, quitando los tipos, así que los tests no necesitan compilar. TypeScript solo se instala para comprobar los tipos.

1. Clona el repositorio, entra en la carpeta e instala las dos dependencias de desarrollo:

   ```bash
   npm ci
   ```

2. Pasa los tests y comprueba los tipos:

   ```bash
   npm test
   npm run check
   ```

3. Recorre el historial de la kata, del primer paso al último:

   ```bash
   git log --oneline --reverse
   git checkout <commit>   # y npm test en cada paso
   git checkout main       # para volver
   ```

## Qué mirar primero

1. El historial: `git log --reverse --format=%s`. Cada mensaje empieza por su fase, `Rojo:`, `Verde:` o `Refactor:`, y describe el comportamiento del paso. Los commits `Test:` son los tres tests que pasaron a la primera: la superpoblación, las ocho vecinas y el planeador.
2. [`vida.test.ts`](vida.test.ts): los 17 tests, que se leen como la especificación del juego.
3. [`vida.ts`](vida.ts): la implementación final, y cómo creció con `git log -p vida.ts`. Algunos verdes parecen trampa a propósito, como contar todas las células menos una: son lo mínimo para pasar el test de ese paso, y el test siguiente los desmonta.
4. [`scripts/comprobar-historial.sh`](scripts/comprobar-historial.sh): recorre el historial y falla si un commit `Rojo:` pasa, si uno `Verde:`, `Refactor:` o `Test:` no pasa los tests o la comprobación de tipos, o si un `Verde:` toca los tests. Comprueba que cada rojo falla, no por qué. La CI lo ejecuta en cada push a `main` y en cada pull request; en local, con `npm run test:historial`.

## Versiones

- Node.js 24.22.3 (`.node-version`). Cada commit se ha comprobado también con Node.js 26.13.1, y la CI pasa los tests en las dos versiones.
- TypeScript 7.0.2 y `@types/node` 24.19.2, fijados en `package.json`, solo para comprobar los tipos.
- Tests con `node:test` y `node:assert/strict`, sin librerías.

## Cómo se hizo

Desarrollado con el enfoque [IA Limpia](https://rubentejera.com/que-es-la-ia-limpia/): un agente de IA escribe el código siguiendo los pasos del artículo, los tests validan cada paso y el resultado se revisa y se aprueba a mano antes de publicarlo.

El historial reconstruye los pasos del artículo en su mismo orden, para poder recorrerlos uno a uno. La CI comprueba en cada push que cada rojo falla y cada verde y cada refactor pasan (`npm run test:historial`).

## Licencia

[MIT](LICENSE).
