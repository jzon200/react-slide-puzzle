const CORRECT_TILES = generatePuzzle(4);

/**
 * @params Size of Puzzle.
 * @returns 2D array Puzzle Board.
 */
function generatePuzzle(size: number) {
  const temp: number[] = [];
  const puzzleTiles: number[][] = [];

  for (let i = 1; i <= size * size; i++) {
    temp.push(i);
  }

  // passed the temp as value of 2D Array
  while (temp.length !== 0) {
    puzzleTiles.push(temp.splice(0, size));
  }

  return puzzleTiles;
}

// TODO: Shuffle puzzle again if it is unsolvable
function shufflePuzzle(puzzleTiles: number[][]) {
  // converts 2D array to 1D array for easy manipulation
  const cleaned = [].concat(...(puzzleTiles as []));

  const shuffled = cleaned
    .map((value) => ({
      value,
      random: Math.random(),
    }))
    .sort((a, b) => a.random - b.random)
    .map(({ value }) => value);

  const shuffledPuzzle: number[][] = [];

  while (shuffled.length !== 0) {
    shuffledPuzzle.push(shuffled.splice(0, puzzleTiles.length));
  }

  return shuffledPuzzle;
}

/**
 * @param puzzleTiles Current Puzzle Tiles y & x position.
 * @returns The amount of incorrect Puzzle y & x position.
 */
function getTilesLeft(puzzleTiles: number[][]) {
  const cleaned: number[] = [].concat(...(puzzleTiles as []));
  const correctTiles: number[] = [].concat(...(CORRECT_TILES as []));

  const tilesLeft = cleaned.reduce((accumulator, currentValue, index) => {
    // ignores the correct position of empty space
    if (currentValue === cleaned.length) {
      return accumulator;
    }

    const correctTilesLen = currentValue === correctTiles[index] ? 1 : 0;

    return accumulator - correctTilesLen;
  }, cleaned.length - 1);

  return tilesLeft;
}

export { CORRECT_TILES, shufflePuzzle, getTilesLeft };
