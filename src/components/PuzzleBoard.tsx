import { usePuzzleDispatch, usePuzzleSelector } from "../hooks";
import PuzzleTile from "./PuzzleTile";

export default function PuzzleBoard() {
  const { currentTiles, activeTile } = usePuzzleSelector();
  const dispatch = usePuzzleDispatch();

  const activeTileIndex = currentTiles.findIndex(
    (value, index) => value[index] === activeTile
  );

  const puzzleTiles: JSX.Element[] = [];

  // const puzzleTiles = currentTiles.map((value, index) => (
  //   <PuzzleTile
  //     key={index}
  //     value={value[index]}
  //     isWhiteSpace={value[index] === 16}
  //     isActive={activeTileIndex === index}
  //     onClick={() => {
  //       dispatch({ type: "clicked_tile", value: value[index] });
  //     }}
  //   />
  // ));

  for (let i = 0; i < currentTiles.length; i++) {
    const row = currentTiles[i];
    for (let j = 0; j < row.length; j++) {
      const column = row[j];
      puzzleTiles.push(
        <PuzzleTile
          key={column}
          value={column}
          isWhiteSpace={column === 16}
          isActive={activeTileIndex === column}
          onClick={() => {
            dispatch({ type: "clicked_tile", value: column });
          }}
        />
      );
    }
  }

  const whiteSpaceRowIndex = currentTiles.findIndex((value) =>
    value.find((value) => value === 16)
  );
  const whiteSpaceColIndex = currentTiles[whiteSpaceRowIndex].findIndex(
    (value) => value === 16
  );

  // console.log(whiteSpaceRowIndex, whiteSpaceColIndex);

  // console.log(currentTiles[0][3]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[repeat(4,_80px)] place-items-center gap-2">
        {puzzleTiles}
      </div>
    </div>
  );
}
