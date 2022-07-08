import { usePuzzleSelector } from "../hooks";
import { getCorrectTiles } from "../utils";

export default function Header() {
  const { moves, isSolved, currentTiles } = usePuzzleSelector();

  const heading = isSolved ? "Well done. Congrats!" : "Puzzle Challenge";

  const correctTiles = getCorrectTiles(currentTiles);
  const tilesLeft = 15 - correctTiles;

  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{heading}</h1>
      <div className="my-4 text-lg text-blue-600 font-bold">
        {moves} <span className="font-normal">Moves | </span>
        {tilesLeft} <span className="font-normal">Tiles</span>
      </div>
    </header>
  );
}
