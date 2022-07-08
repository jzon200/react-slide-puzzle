import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, activeTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const puzzleTiles: JSX.Element[] = [];

  for (let i = 0; i < currentTiles.length; i++) {
    const row = currentTiles[i];
    for (let j = 0; j < row.length; j++) {
      const column = row[j];
      puzzleTiles.push(
        <PuzzleTile
          key={column}
          value={column}
          isSpace={column === 16}
          isActive={activeTile === column}
          onClick={() => {
            dispatch({ type: "moved_tile", value: column });
          }}
        />
      );
    }
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[repeat(4,_80px)] place-items-center gap-2">
        {puzzleTiles}
      </div>
    </div>
  );
}
