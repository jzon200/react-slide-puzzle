import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, activeTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const normalized = [].concat(...(currentTiles as never[]));
  const maxValue = normalized.length;

  const puzzleTiles = normalized.map((value) => (
    <PuzzleTile
      key={value}
      value={value}
      isSpace={value === maxValue}
      isActive={value === activeTile}
      onClick={() => {
        dispatch({ type: "moved_tile", value: value });
      }}
    />
  ));

  const gridSize = Math.sqrt(maxValue); // √16 => 4

  return (
    <div className="flex justify-center">
      <div
        className={`grid grid-cols-[repeat(${gridSize},_80px)] place-items-center gap-2`}
      >
        {puzzleTiles}
      </div>
    </div>
  );
}
