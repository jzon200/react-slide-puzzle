import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, activeTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const activeTileIndex = currentTiles.findIndex(
    (value) => value === activeTile
  );

  const puzzleTiles = currentTiles.map((value, index) => (
    <PuzzleTile
      key={index}
      value={value}
      isWhiteSpace={value === 16}
      isActive={activeTileIndex === index}
      onClick={() => {
        dispatch({ type: "clicked_tile", value });
      }}
    />
  ));

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[repeat(4,_80px)] place-items-center gap-2">
        {puzzleTiles}
      </div>
    </div>
  );
}
