const CORRECT_TILES = generatePuzzle(4);

/**
 * @params size of puzzle
 * @returns 4x4 2D Array Puzzle as default
 */
function generatePuzzle(size: number = 4) {
  const temp: number[] = [];
  const puzzleTiles: number[][] = [];

  for (let i = 1; i <= size * size; i++) {
    temp.push(i);
  }

  while (temp.length !== 0) {
    puzzleTiles.push(temp.splice(0, size));
    console.log(puzzleTiles);
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
    shuffledPuzzle.push(shuffled.splice(0, array.length));
  }

  return shuffledPuzzle;
}

function getTilesLeft(array: number[][]) {
  // converts 2D array to 1D array for easy manipulation
  const normalized = [].concat(...(array as []));

  const puzzleTiles = normalized.filter((value) => value !== normalized.length);

  const correctTiles = []
    .concat(...(CORRECT_TILES as []))
    .filter((value) => value !== normalized.length);

  //* filters the length of correct tiles
  const correctTilesLen = puzzleTiles.filter(
    (value, index) => value === correctTiles[index]
  ).length;

  // console.log(puzzleTiles, correctTiles, correctTilesLen);

  const tilesLeft = puzzleTiles.length - correctTilesLen;

  return tilesLeft;
}

export { CORRECT_TILES, shufflePuzzle, getTilesLeft };
