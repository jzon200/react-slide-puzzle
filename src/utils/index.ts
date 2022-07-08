const CORRECT_TILES = generatePuzzle();

/**
 * @returns 4x4 Puzzle 2D Array
 */
function generatePuzzle() {
  const sides = 4;
  const puzzleTiles: number[][] = [];
  let val = 1;

  for (let row = 0; row < sides; row++) {
    // Initialize every row as empty array
    puzzleTiles[row] = [];
    for (let col = 0; col < sides; col++) {
      puzzleTiles[row][col] = val++;
    }
  }

  return puzzleTiles;
}

// TODO: Shuffle puzzle again if it is unsolvable
function shufflePuzzle(array: number[][]) {
  // converts 2D array to 1D array for easy manipulation
  const normalized = [].concat(...(array as never[]));

  const shuffled = normalized
    .map((value) => ({
      value,
      random: Math.random(),
    }))
    .sort((a, b) => a.random - b.random)
    .map(({ value }) => value);

  const shuffledPuzzle: number[][] = [];

  while (shuffled.length !== 0) {
    shuffledPuzzle.push(shuffled.splice(0, 4));
  }

  return shuffledPuzzle;
}

function getCorrectTiles(array: number[][]) {
  // converts 2D array to 1D array for easy manipulation
  const puzzleTiles = []
    .concat(...(array as never[]))
    .filter((value) => value !== 16);

  const correctTiles = []
    .concat(...(CORRECT_TILES as never[]))
    .filter((value) => value !== 16);

  //* filters the length of correct tiles
  const correctTilesLen = puzzleTiles.filter(
    (value, index) => value === correctTiles[index]
  ).length;

  return correctTilesLen;
}

export { CORRECT_TILES, shufflePuzzle, getCorrectTiles };
