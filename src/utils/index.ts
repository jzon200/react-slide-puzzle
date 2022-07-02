function generatePuzzle() {
  const puzzleTiles: number[] = [];

  for (let i = 1; i <= 16; i++) {
    puzzleTiles.push(i);
  }

  return puzzleTiles;
}

function isEven(value: number) {
  return value % 2 === 0;
}

function isOdd(value: number) {
  return value % 2 === 1;
}

const CORRECT_TILES = generatePuzzle();

export { CORRECT_TILES, isEven, isOdd };
