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

const CORRECT_TILES = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

export { CORRECT_TILES, generatePuzzle, isEven, isOdd };
