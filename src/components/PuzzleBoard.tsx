import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, selectedTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const selectedTileIndex = currentTiles.findIndex(
    (value) => value === selectedTile
  );

  const puzzleTiles = currentTiles.map((value, index) => (
    <PuzzleTile
      key={index}
      value={value}
      isActive={selectedTileIndex === index}
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
