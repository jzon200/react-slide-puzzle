export default function shufflePuzzle(puzzleTiles: number[]) {
  return puzzleTiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
