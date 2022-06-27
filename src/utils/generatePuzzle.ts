export default function generatePuzzle() {
  const puzzleTiles: number[] = [];

  for (let i = 1; i <= 16; i++) {
    puzzleTiles.push(i);
  }

  return puzzleTiles;
}
