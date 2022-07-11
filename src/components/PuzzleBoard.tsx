import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, activeTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const cleaned = [].concat(...(currentTiles as []));
  const maxValue = cleaned.length;

  const puzzleTiles = cleaned.map((value) => (
    <PuzzleTile
      key={value}
      value={value}
      isEmptySpace={value === maxValue}
      isActive={value === activeTile}
      onClick={() => {
        dispatch({ type: "moved_tile", value: value });
      }}
    />
  ));

  const gridColSize = Math.sqrt(maxValue); // √16 => 4

  return (
    <div className="flex justify-center">
      <div
        className="grid place-items-center gap-2"
        style={{ gridTemplateColumns: `repeat(${gridColSize}, 80px)` }}
      >
        {puzzleTiles}
      </div>
    </div>
  );
}
